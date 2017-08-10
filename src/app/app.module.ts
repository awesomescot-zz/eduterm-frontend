import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Headers, Http, Response, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ChapterItemComponent } from './chapter-item/chapter-item.component';
import { ChapterDetailsComponent } from './chapter-details/chapter-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChapterService } from './chapter.service';
import { ChatService } from './chat.service';
import { AuthService } from './auth.service';
import { ChatComponent } from './chat/chat.component';
import { StatusBoxComponent } from './status-box/status-box.component';
import { TerminalComponent } from './terminal/terminal.component';
import { ChatQuestionComponent } from './chat-question/chat-question.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';

const appRoutes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
//  { path: 'signup', component: HeroListComponent },
  { path: 'chapters/:title', component: ChapterDetailsComponent},
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChapterListComponent,
    ChapterItemComponent,
    ChapterDetailsComponent,
    DashboardComponent,
    LoginComponent,
    ChatComponent,
    StatusBoxComponent,
    TerminalComponent,
    ChatQuestionComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
//      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [ChapterService,
    ChatService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
