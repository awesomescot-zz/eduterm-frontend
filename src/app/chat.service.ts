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
  // = [{text: 'hello', message_side: 'right'},
  //{text: 'no more room!!', message_side: 'left'}];
  getMessages(): Observable<ChatMessage>{
    return this.messages$.asObservable();
  }
  subscriber = this.getMessages().subscribe(data => {
    this.messages.push(data);
  });
  questions: ChatQuestion[];// = [{text: "what is next?", id: 0, visible: true},
  //  {text: "Another question!", id: 1, visible: true}];
  step: number = 0;

  questionClicked(question:ChatQuestion){
    this.messages.push({text:question.text, message_side: 'right'});
    this.questions = this.questions.map(q =>
      q.id === question.id
        ? {text:q.text, id:q.id, visible: false}
        : q);
    this.getQuestionAnswer(question.id);
  }

  constructor(private authHttp:AuthHttp, private chapterService:ChapterService) {
  }

  getNextChat(){
    return this.authHttp.get(`http://localhost:8000/${this.chapterService.currentChapter}/api/chat/${this.step}`)
      .map(res => res.json())
      .map(
        data => {
          //this.messages.push({text:data.chat, message_side: 'left'});
          this.messages$.next({text:data.chat, message_side: 'left'});
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
