import { Injectable } from '@angular/core';
import { Chapter } from './models/chapter';
import { Http, Response, HttpModule, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ChapterService {

  data:Chapter[] = [];

  constructor(private authHttp:AuthHttp, private authService:AuthService) {

  }

  getChapter(title:string):Chapter {
  	return this.data.find(x => x.title === title)
  }

  populateChapters(){
    // let headers = new Headers();
    // headers.append('Authorization', 'Bearer '+ this.authService.getToken());

    // let options = new RequestOptions({ headers: headers });
    // this.http.get("http://localhost:8000/api/chapters", options).subscribe(res => {
    //     console.log(res);
    //     console.log(this.authService.getUser());
    //     this.data = res.json().map(chapter => {
    //       return {title: chapter, enabled: this.authService.getUser().available_chapters.includes(chapter)}
    //     });
    //     callback(this.data);
    // });
    return this.authHttp.get("http://localhost:8000/api/chapters")
      .map(res => res.json())
      .map(
        data => this.data = data.map(chapter => {
          return {title: chapter, enabled: this.authService.getUser().available_chapters.includes(chapter)}
        })
      ).catch((error:any) => Observable.throw(error));
  }

}
