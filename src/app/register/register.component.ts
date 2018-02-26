import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  public isOccupied: boolean;

  constructor(private accountService: AccountService,private router: Router) { }

  ngOnInit() {
    let fb = new FormBuilder();
    this.registerForm = fb.group({
      name:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_\u4e00-\u9fa5]{3,16}$')]],
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')]],
      password:['',[Validators.required,Validators.pattern('^[0-9A-Za-z_]{6,14}$')]],
      passwordConfirm:['',[Validators.required,this.passwordConfirmValidator]],
      position:['',[Validators.required]]
    });
  }

  passwordConfirmValidator(control: FormGroup){
      return (control.root.value.password==control.value)? null : {'passwordError': {value: 'password mismatch'}};
  }

  submit(){
    let obj = {
      username: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      position: this.registerForm.value.position
    };
    this.accountService.register(obj).subscribe(res => {
      if(res.json()=='this email has been registered before'){
        this.isOccupied = true;
      }else{
        this.router.navigateByUrl('/login');
      }
    });
  }

  close(){
    this.isOccupied = false;
  }

}
