import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Chapter} from '../models/chapter';

@Component({
  selector: 'app-chapter-item',
  templateUrl: './chapter-item.component.html',
  styleUrls: ['./chapter-item.component.css']
})



export class ChapterItemComponent implements OnInit {

  @Input() chapter:Chapter;
  @Output() onClick:EventEmitter<any> = new EventEmitter();
  
  get title():string { return this.chapter ? this.chapter.title : "not exists"}
  get enabled():boolean { return this.chapter ? this.chapter.enabled : false }

  constructor() { }

  ngOnInit() {
  }

}
