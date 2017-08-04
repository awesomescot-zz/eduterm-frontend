import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ChapterItemComponent } from './chapter-item/chapter-item.component';
import { ChapterDetailsComponent } from './chapter-details/chapter-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChapterService } from './chapter.service';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
//      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ChapterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
