import { Injectable } from '@angular/core';
import { Chapter } from './models/chapter';

@Injectable()
export class ChapterService {

  data:Chapter[] = [];
  
  constructor() { 
    this.data = [{title: 'first chapter', enabled: true}, 
  	  {title: 'second chapter', description:'everything', enabled: false}];
  }

  getChapter(title:string):Chapter {
  	return this.data.find(x => x.title === title)
  }

}
