import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ChatMessage } from '../models/chat-message';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message:ChatMessage;
  sanitizedMessageHtml: SafeHtml;
  
  constructor(private sanitizer:DomSanitizer) { 

  }

  ngOnInit() {
    this.sanitizedMessageHtml = this.sanitizer.bypassSecurityTrustHtml(this.message.text);
  }
  ngAfterViewInit(){
    let $messages = document.getElementById("messages");
    $messages.scrollTop = $messages.scrollHeight;
  }

}
