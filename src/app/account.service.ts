import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class AccountService {

  constructor(private http: Http) { }

  register(body){
    return this.http.post('/api/createAccount',body);
  }

  logIn(body){
    return this.http.post('/api/login',body);
  }

  isloggedIn(){
    return this.http.get('/api/checkLogin');
  }

  signOut(){
    return this.http.get('/api/logOut');
  }

  getUser(){
    return this.http.get('/api/user');
  }

  submitFeedback(body){
    return this.http.post('/api/submitFeedback',body);
  }

  getFeedbacks(body){
    return this.http.post('/api/getFeedback',body);
  }

}
