import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class AccountService {

  constructor(private http: Http) { }

  register(body){
    return this.http.post('/api/createAccount',body);
  }

}
