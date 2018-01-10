import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {Person, PersonServiceService} from "../person-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  public formModel: FormGroup;

  public person: Person;

  constructor(
    public personService: PersonServiceService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      name:[''],
      age:[''],
      gender:[''],
      department:[''],
      phone:[''],
      degree:[''],
      jobnumber:['']
    })

    let personId = this.activatedRoute.snapshot.params.id;
    this.personService.getPerson(personId)
      .subscribe(res => {
          this.formModel.reset({
            name:res.name,
            age:res.age,
            gender:res.gender,
            department:res.department,
            phone:res.phone,
            degree:res.degree,
            jobnumber:res.jobNumber
          })
      });
  }


  save(){
    let id = this.activatedRoute.snapshot.params.id;
    let obj = {
      name:this.formModel.value.name,
      age:this.formModel.value.age,
      gender:this.formModel.value.gender,
      department:this.formModel.value.department,
      phone:this.formModel.value.phone,
      degree:this.formModel.value.degree,
      jobNumber:this.formModel.value.jobnumber,
    }
    this.personService.updatePerson(id,obj).subscribe(res => {
      this.router.navigateByUrl('/person');
    });
  }



  cancel(){
    this.router.navigateByUrl('/person');
  }

}
