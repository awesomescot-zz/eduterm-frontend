import { Injectable } from '@angular/core';
import { ChatMessage } from './models/chat-message';
import { ChatQuestion } from './models/chat-question';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable, Subject } from 'rxjs/Rx';
import { ChapterService } from './chapter.service';

@Injectable()
export class ChatService {
  messages: ChatMessage[] = [];
  messages$: Subject<ChatMessage> = new Subject();

  getMessages(): Observable<ChatMessage>{
    return this.messages$.asObservable();
  }
  subscriber = this.getMessages().subscribe(data => {
    this.messages.push(data);
  });
  questions: ChatQuestion[];
  step: number = 0;
  correctQuestion: number = -1;

  questionClicked(question:ChatQuestion){
    // add message for the question pressed
    this.messages.push({text:question.text, message_side: 'right'});
    // remove question from array
    this.questions = this.questions.map(q =>
      q.id === question.id
        ? {text:q.text, id:q.id, visible: false}
        : q);
    // if correct question move to next step
    console.log(`question.id = ${question.id} and correctQuestion = ${this.correctQuestion}`);
    if (question.id === this.correctQuestion){
      this.step++;
      this.getNextChat().subscribe();
    } else {
      // get answer to question
      this.getQuestionAnswer(question.id);
    }
  }

  constructor(private authHttp:AuthHttp, private chapterService:ChapterService) {
  }

  getNextChat(){
    console.log(`get next chat.  step: ${this.step}`);
    return this.authHttp.get(`http://localhost:8000/${this.chapterService.currentChapter}/api/chat/${this.step}`)
      .map(res => res.json())
      .map(
        data => {
          //this.messages.push({text:data.chat, message_side: 'left'});
          this.messages$.next({text:data.chat, message_side: 'left'});
          this.correctQuestion = data.correct_question;
          this.questions = data.questions.map( (question, index) => {
            return { text: question, id: index, visible: true }
          });
        }
      ).catch((error:any) => Observable.throw(error));
  }

  getQuestionAnswer(questionId:number){
    this.authHttp.get(`http://localhost:8000/${this.chapterService.currentChapter}/api/chat/${this.step}/answer/${questionId}`)
      .map(res => res.json())
      .subscribe(
        data => {
          //this.messages.push({text:data.chat, message_side: 'left'});
          this.messages$.next({text:data.chat, message_side: 'left'});
        }
      );
  }

  getStatus(){
    console.log("getStatus() step: " + this.step);
    return this.authHttp.get(`http://localhost:8000/${this.chapterService.currentChapter}/api/status/${this.step}`)
      .map(res => res.json())
      .map(
        data => {
          if(data.status){
            this.step++;
            this.getNextChat().subscribe();
          }
        }
      ).catch((error:any) => Observable.throw(error));
  }

  // sendMessage(text:string, message_side:string) {
  //   if (text.trim() === '') {
  //     return;
  //   }
  //   this.messages = [{
  //     text: text,
  //     message_side: message_side
  //   }];
  //   message.draw();
  //   return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
  // }

}
