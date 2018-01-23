import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public isError: boolean;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    let fb = new FormBuilder();
    this.loginForm = fb.group({
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')]],
      password:['',[Validators.required,Validators.pattern('^[0-9A-Za-z_]{6,14}$')]]
    });

  }

  signIn(){
    if(this.loginForm.valid){
      let obj = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.accountService.logIn(obj).subscribe(res => {
        if(res.json()=='email or password incorrect'){
          this.isError = true;
        }else {
          this.router.navigateByUrl('/admin');
        }
      });
    }
  }

  close(){
    this.isError = false;
  }

}
