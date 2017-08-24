import { Injectable } from '@angular/core';
import { ChatMessage } from './models/chat-message';
import { ChatQuestion } from './models/chat-question';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';
import { ChapterService } from './chapter.service';

@Injectable()
export class ChatService {
  messages: ChatMessage[] = [];// = [{text: 'hello', message_side: 'right'},
    //{text: 'no more room!!', message_side: 'left'}];
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
    console.log(`current chapter is: ${this.chapterService.currentChapter}`);
    this.authHttp.get(`http://localhost:8000/${this.chapterService.currentChapter}/api/chat/${this.step}`)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.messages.push({text:data.chat, message_side: 'left'});
          this.questions = data.questions.map( (question, index) => {
            return { text: question, id: index, visible: true }
          });
        }
      );
  }

  getQuestionAnswer(questionId:number){
    this.authHttp.get(`http://localhost:8000/${this.chapterService.currentChapter}/api/chat/${this.step}/answer/${questionId}`)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.messages.push({text:data.chat, message_side: 'left'});
        }
      );
  }

  getStatus(){
    this.authHttp.get(`http://localhost:8000/${this.chapterService.currentChapter}/api/status/${this.step}`)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          if(data.status){
            this.step++;
            this.getNextChat();
          }
        }
      );
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
