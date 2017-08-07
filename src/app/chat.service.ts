import { Injectable } from '@angular/core';
import { ChatMessage } from './models/chat-message';
import { ChatQuestion } from './models/chat-question';

@Injectable()
export class ChatService {
  messages: ChatMessage[] = [{text: 'hello', message_side: 'right'},
    {text: 'no more room!!', message_side: 'left'}];
  questions: ChatQuestion[] = [{text: "what is next?", question_index: 0}, 
    {text: "Another question!", question_index: 1}];
 


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
