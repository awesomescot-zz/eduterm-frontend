import { Component, OnInit } from '@angular/core';
import {Chapter} from '../models/chapter';
import {ChapterService} from '../chapter.service';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  chapters:Chapter[];
  onChapterClick = (event):void => {
    console.log(event);
  }

  constructor(private chapterService:ChapterService) {

  }

  ngOnInit() {
    this.chapterService.populateChapters((data) => this.chapters = data);
  }

}
