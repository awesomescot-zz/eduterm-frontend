import { Injectable } from '@angular/core';
import { Headers, Http, Response, HttpModule } from '@angular/http';
import { User } from './models/user';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  token:string;
  user:User;
  authenticated:boolean;
  jwtHelper: JwtHelper = new JwtHelper();

  signup(user:User){
    this.http.post("http://localhost:8000/api/register", user)
      .subscribe(data => {
        localStorage.setItem('token',data.json().token);
        this.token = data.json().token;
        console.log(this.token);
        this.router.navigateByUrl('/home')
      }, err => {
        console.log(err);
      })
  }

  login(loginUser:User) {
    this.http.post("http://localhost:8000/api/login", loginUser)
    .subscribe(data => {
      localStorage.setItem('token',data.json().token);
      this.token = data.json().token;
      console.log(this.token);
      this.user = this.jwtHelper.decodeToken(this.token).user;
      this.router.navigateByUrl('/home')
    }, err => {
      console.log(err);
    });
  }
  loggedIn() {
    //return true;
    return tokenNotExpired();
  }
  logOut(){
    localStorage.removeItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUser(){
    return this.jwtHelper.decodeToken(this.getToken()).user;
  }

  constructor(private http:Http, private router:Router) {
    this.authenticated = false;
  }



}
