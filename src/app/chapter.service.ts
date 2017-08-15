import { Injectable } from '@angular/core';
import { Chapter } from './models/chapter';
import { Http, Response, HttpModule, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class ChapterService {

  data:Chapter[] = [];

  constructor(private http:Http, private authService:AuthService) {

  }

  getChapter(title:string):Chapter {
  	return this.data.find(x => x.title === title)
  }

  populateChapters(callback:Function){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer '+ this.authService.getToken());

    let options = new RequestOptions({ headers: headers });
    this.http.get("http://localhost:8000/api/chapters", options).subscribe(res => {
        console.log(res);
        console.log(this.authService.getUser());
        this.data = res.json().map(chapter => {
          return {title: chapter, enabled: this.authService.getUser().available_chapters.includes(chapter)}
        });
        callback(this.data);
    });
  }

}
