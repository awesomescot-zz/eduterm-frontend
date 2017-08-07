import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

@Injectable()
export class AuthService {

  private authLoginUrl = 'http://localhost:8000/login'
  private authSignupUrl = 'http://localhost:8000/signup'

  constructor(private http: Http) { }

//  login() {
//    return this.http
//    .post()
//  }

}
