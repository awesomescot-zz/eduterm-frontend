import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../chat.service';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';
import { ChatMessage } from '../models/chat-message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  //@ViewChild('domMessages')domMessages: ElementRef;

  onQuestionClick(event){
    this.chat.questionClicked(event);
  }

  constructor(private chat:ChatService) { }

  ngOnInit() {
    this.chat.getNextChat().subscribe(
      data => {},
      error => console.log(error)
    );
    setInterval(() => {
      this.chat.getStatus().subscribe();
    }, 2000);
  }


/*  scrollMessagesToBottom(){
    let $messages = this.domMessages.nativeElement;
    console.log(`Scrolling to bottom: ${$messages.scrollHeight}`);
    $messages.scrollTop = $messages.scrollHeight;
  }*/



}
