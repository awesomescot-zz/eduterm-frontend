import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Chapter} from '../models/chapter';

@Component({
  selector: 'app-chapter-item',
  templateUrl: './chapter-item.component.html',
  styleUrls: ['./chapter-item.component.css']
})



export class ChapterItemComponent implements OnInit {

  @Input() object:Chapter;
  @Output() onClick:EventEmitter<any> = new EventEmitter();
  get title():string { return this.object ? this.object.title : "not exists"}

  constructor() { }

  ngOnInit() {
  }

}
