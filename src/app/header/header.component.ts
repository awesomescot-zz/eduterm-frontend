import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ChapterService } from '../chapter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private chapterService: ChapterService) { }

  ngOnInit() {
  }

}
