import { Injectable } from '@angular/core';
import { Headers, Http, Response, HttpModule } from '@angular/http';
import { User } from './models/user';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  token:string;
  user:User;
  authenticated:boolean;


  login(loginUser:User) {
    this.http.post("http://localhost:8000/api/login", loginUser)
    .subscribe(data => { 
      localStorage.setItem('token',data.json().token);
      this.token = data.json().token;
      console.log(this.token);
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
  
  constructor(private http:Http, private router:Router) { 
    this.authenticated = false;
  }



}
