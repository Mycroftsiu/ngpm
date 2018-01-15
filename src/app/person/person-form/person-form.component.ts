import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {PersonServiceService} from "../person-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  public formModel: FormGroup;

  constructor(
    public personService: PersonServiceService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      name:['',[Validators.required]],
      age:['',[Validators.pattern('(^18$|^19$)|(^[2-5][0-9]$|^60$)')]],
      gender:[''],
      department:[''],
      phone:['',[Validators.required,Validators.pattern('1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\\d{8}')]],
      degree:[''],
      jobnumber:['',[Validators.pattern('[0-9]{8,8}')]]
    })

    let personId = this.activatedRoute.snapshot.params.id;
    if(personId != 'create'){
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

  }


  save(){
    let obj = {
      name:this.formModel.value.name,
      age:this.formModel.value.age,
      gender:this.formModel.value.gender,
      department:this.formModel.value.department,
      phone:this.formModel.value.phone,
      degree:this.formModel.value.degree,
      jobNumber:this.formModel.value.jobnumber,
    }
    let id = this.activatedRoute.snapshot.params.id;
    if(id != 'create'){
      this.personService.updatePerson(id,obj).subscribe(res => {
        this.router.navigateByUrl('/person');
      });
    }else {
      this.personService.createPerson(obj).subscribe(res => {
        this.router.navigateByUrl('/person');
      });
    }

  }



  cancel(){
    this.router.navigateByUrl('/person');
  }

}
