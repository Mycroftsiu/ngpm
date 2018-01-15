import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class PersonServiceService {

  constructor(private http: Http) { }

  getPersons(): Observable<Person[]>{
    return this.http.get('/api/person').map(res => res.json());
  }

  getPerson(id: number) {
    return this.http.get('/api/person/'+id).map(res => res.json());
  }

  updatePerson(id,body){
    return this.http.post('/api/person/'+id,body);
  }

  createPerson(body): any{
    return this.http.post('/api/personCreate',body);
  }

  deletePerson(id: number){
    return this.http.delete('/api/person/'+id);
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
