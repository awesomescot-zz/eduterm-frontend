import { Injectable } from '@angular/core';
import { ChatMessage } from './models/chat-message';
import { ChatQuestion } from './models/chat-question';

@Injectable()
export class ChatService {
  messages: ChatMessage[] = [{text: 'hello', message_side: 'right'},
    {text: 'no more room!!', message_side: 'left'}];
  questions: ChatQuestion[] = [{text: "what is next?", id: 0, visible: true}, 
    {text: "Another question!", id: 1, visible: true}];
 
  questionClicked(question:ChatQuestion){
    this.messages.push({text:question.text, message_side: 'left'});
    this.questions = this.questions.map(q => 
      q.id === question.id
        ? {text:q.text, id:q.id, visible: false}
        : q);
  }

  constructor() { 
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
