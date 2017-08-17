import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Headers, Http, Response, HttpModule } from '@angular/http';
import { AuthModule } from './auth.module';

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
import { AuthGuardService } from './auth-guard.service';
import { ChatComponent } from './chat/chat.component';
import { StatusBoxComponent } from './status-box/status-box.component';
import { TerminalComponent } from './terminal/terminal.component';
import { ChatQuestionComponent } from './chat-question/chat-question.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'chapters/:title', component: ChapterDetailsComponent, canActivate: [AuthGuardService]},
  { path: '**', component: AppComponent, canActivate: [AuthGuardService] }
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
    ChatMessageComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
//      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    HttpClientModule,
    HttpModule,
    AuthModule
  ],
  providers: [ChapterService,
    ChatService,
    AuthService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
