import { Component, OnInit } from '@angular/core';
import {PersonServiceService, Person} from "../person-service.service";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {Http} from "@angular/http";

@Component({
  selector: 'app-person-management',
  templateUrl: './person-management.component.html',
  styleUrls: ['./person-management.component.css']
})
export class PersonManagementComponent implements OnInit {

  private persons;

  private nameFilter: FormControl = new FormControl();

  private keyword: string;

  delete(id) {
    if(confirm("Do you really want to delete?")){
      this.personService.deletePerson(id)
        .subscribe(res => {
          this.personService.getPersons().subscribe(res => {
            this.persons = res;
          });
        });
    }
  }

  constructor(
    public personService: PersonServiceService
  ) { }

  ngOnInit() {
    this.personService.getPersons().subscribe(res => {
      this.persons = res;
    });
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(val => {
        this.keyword = val.toLowerCase();
      });
  }

}
