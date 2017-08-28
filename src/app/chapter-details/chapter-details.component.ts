import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { ChapterService } from '../chapter.service';
import { Chapter } from '../models/chapter';
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';

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
                private authService: AuthService,
                private zone:NgZone,
                private chatService:ChatService) { 
    (<any>window).angularComponentRef = {
      zone: this.zone, 
      completeChapter: () => this.completedChapter(), 
      component: this
    };
  }

  ngOnInit() {
  	this._route.params.subscribe(params => {
  		this.chapterTitle = params.title;
      this.chapterService.setChapter(params.title);
      this.chapterObject = this.chapterService.getChapter(this.chapterTitle);
      this.chatService.step = 0;
      this.chatService.messages = [];
      console.log("chapter-details OnInit");
  	});
  }
  ngAfterViewInit(){
    this.chapterService.getChapterSpecificJavascript().subscribe(
      data => {
        let self = this;
        //eval('console.log(me.authService);');
        eval(data.code);
      },
      error => {}
    );
  }
  completedChapter(){
    this.chapterService.completeChapter().subscribe(data =>
      {
        jQuery("#completeModal").modal();
      }
    );
  }
  nextChapterLink(){
    let nextChapter = this.chapterService.getNextChapter();
    this._router.navigateByUrl(`/chapters/${nextChapter.title}`);
    window.location.reload();
  }
  homeLink(){
    this._router.navigateByUrl("/home");
    window.location.reload();
  }


}
