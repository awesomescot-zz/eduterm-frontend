import { Injectable } from '@angular/core';
import { Headers, Http, Response, HttpModule } from '@angular/http';
import { User } from './models/user';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();

  signup(user:User){
    this.http.post("http://localhost:8000/api/register", user)
      .subscribe(data => {
        localStorage.setItem('token',data.json().token);
        this.router.navigateByUrl('/home')
      }, err => {
        console.log(err);
      })
  }

  login(loginUser:User) {
    this.http.post("http://localhost:8000/api/login", loginUser)
    .subscribe(data => {
      localStorage.setItem('token',data.json().token);
      this.router.navigateByUrl('/home')
    }, err => {
      console.log(err);
    });
  }
  loggedIn() {
    if(localStorage.getItem('token')){
      return tokenNotExpired();
    } else {
      return false;
    }
  }
  logOut(){
    localStorage.removeItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUser():User{
    return this.jwtHelper.decodeToken(this.getToken()).user;
  }

  constructor(private http:Http, private router:Router, private authHttp:AuthHttp) {
  }
  makeAuthGetRequest(url:string){
    return this.authHttp.get(url)
      .map(res => res.json())
      .catch(error => Observable.throw(error));
  }



}
