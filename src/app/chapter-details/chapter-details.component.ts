import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { ChapterService } from '../chapter.service';
import { Chapter } from '../models/chapter';
import { AuthService } from '../auth.service';

declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-chapter-details',
  templateUrl: './chapter-details.component.html',
  styleUrls: ['./chapter-details.component.css']
})
export class ChapterDetailsComponent implements OnInit {
  chapterTitle:string;
  chapterObject: Chapter;
  statusHtml: string = '';

  constructor(  private _router: Router,
                private _route: ActivatedRoute,
                private chapterService: ChapterService ,
                private authService: AuthService) { }

  ngOnInit() {
  	this._route.params.subscribe(params => {
  		console.log(params);
  		this.chapterTitle = params.title;
      this.chapterService.setChapter(params.title);
      this.chapterObject = this.chapterService.getChapter(this.chapterTitle);
  	});
  }
  ngAfterViewInit(){
    this.chapterService.getChapterSpecificJavascript().subscribe(
      data => {
        console.log(`internal script: ${this.authService}`);
        let self = this;
        //eval('console.log(me.authService);');
        eval(data.code);
      },
      error => {}
    );
  }


}
