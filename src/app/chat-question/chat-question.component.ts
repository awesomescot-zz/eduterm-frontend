import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatQuestion } from '../models/chat-question';

@Component({
  selector: 'app-chat-question',
  templateUrl: './chat-question.component.html',
  styleUrls: ['./chat-question.component.css']
})
export class ChatQuestionComponent implements OnInit {
  @Input() question:ChatQuestion;
  @Output() onClick = new EventEmitter(); 
  //onClick(){
    //console.log(this.question.question_index);
  //}

  constructor() { }

  ngOnInit() {
  }

}
