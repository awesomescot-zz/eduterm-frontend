import { Injectable } from '@angular/core';
import { Chapter } from './models/chapter';
import { Http, Response, HttpModule } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class ChapterService {

  data:Chapter[] = [];
  
  constructor(private http:Http, private authService:AuthService) { 
    this.populateChapters();
  }

  getChapter(title:string):Chapter {
  	return this.data.find(x => x.title === title)
  }

  populateChapters(){
    this.http.get("http://localhost:8000/chapters", {withCredentials:true}).subscribe(res => {
      console.log(res);
      this.data = res.json().map(chapter => {
        return {title: chapter, enabled: this.authService.user.available_chapters.includes(chapter)}
      });
    });
  }

}
