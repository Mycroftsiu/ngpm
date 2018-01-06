import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class PersonServiceService {

  constructor(public http: Http) { }

  getPersons(): Observable<Person[]>{
    return this.http.get('/api/person').map(res => res.json());
  }

}

export class Person {
  constructor(
    public name: string,
    public gender: string,
    public age: number,
    public phone: number,
    public department: string,
    public degree: string,
    public jobNumber: number
  ){

  }
}
