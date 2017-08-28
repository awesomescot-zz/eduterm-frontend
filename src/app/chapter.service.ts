import { Injectable } from '@angular/core';
import { Chapter } from './models/chapter';
import { Http, Response, HttpModule, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChapterService {

  chapters:Chapter[] = [];
  currentChapter:string;

  constructor(private authHttp:AuthHttp, private authService:AuthService) {

  }

  // get chapter object from string
  getChapter(title:string):Chapter {
  	return this.chapters.find(x => x.title === title)
  }

  getNextChapter(){
    for(let i=0; i < this.chapters.length; i++){
      if(this.chapters[i].title === this.currentChapter && this.chapters[i+1]){
        return this.chapters[i+1];
      }
    }
  }

  // set current chapter
  setChapter(chapter:string){
    this.currentChapter = chapter;
  }

  // A currentChapter has been completed
  completeChapter(){
    return this.authHttp.post("http://localhost:8000/api/completeChapter", 
      {chapter:this.currentChapter})
      .map(res => res.json())
      .map(res => {this.authService.getNewJwt().subscribe(data => {})})
      .catch((error:any) => Observable.throw(error));
  }

  // generate chapter objects from array of chapters and token with chapters_available
  populateChapters(){
    return this.authHttp.get("http://localhost:8000/api/chapters")
      .map(res => res.json())
      .map(
        data => this.chapters = data.map(chapter => {
          return {title: chapter, enabled: this.authService.
            getUser().available_chapters.includes(chapter)}
        })
      ).catch((error:any) => Observable.throw(error));
  }

  // pull down the chapter specific js from the backend.
  getChapterSpecificJavascript(){
    return this.authHttp.get(`http://localhost:8000/${this.currentChapter}/api/chapter_frontend.js`)
      .map(res => res.json())
      .catch(error => Observable.throw(error));
  }

}
