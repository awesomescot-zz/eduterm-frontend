import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { ChapterService } from '../chapter.service';
import { Chapter } from '../models/chapter';

@Component({
  selector: 'app-chapter-details',
  templateUrl: './chapter-details.component.html',
  styleUrls: ['./chapter-details.component.css']
})
export class ChapterDetailsComponent implements OnInit {
  chapterTitle:string;
  chapterObject: Chapter;
  constructor(  private _router: Router,
                private _route: ActivatedRoute,
                private chapterService: ChapterService ) { }

  ngOnInit() {
  	console.log("chapter-details ngOnInit");
  	this._route.params.subscribe(params => {
  		console.log(params);
  		this.chapterTitle = params.title;
      this.chapterObject = this.chapterService.getChapter(this.chapterTitle);
      
  	});
  }

}
