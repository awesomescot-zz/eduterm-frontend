import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  onQuestionClick(event){
    this.chat.questionClicked(event);
  }

  constructor(private chat:ChatService) { }

  ngOnInit() {

    //this.chat.sendMessage('hello','right');
  }

}
