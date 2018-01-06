import { Component, OnInit } from '@angular/core';
import {PersonServiceService, Person} from "../person-service.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-person-management',
  templateUrl: './person-management.component.html',
  styleUrls: ['./person-management.component.css']
})
export class PersonManagementComponent implements OnInit {

  private persons:Observable<Person[]>;

  constructor(public personService: PersonServiceService) { }

  ngOnInit() {
    this.personService.getPersons().subscribe(res => {
      this.persons = res;
    });
  }

}
