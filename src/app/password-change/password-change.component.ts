import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  public infoForm: FormGroup;

  public pwdInc: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    let fb = new FormBuilder();
    this.infoForm = fb.group({
      oldPassword:['',[Validators.required,Validators.pattern('^[0-9A-Za-z_]{6,14}$')]],
      password:['',[Validators.required,Validators.pattern('^[0-9A-Za-z_]{6,14}$')]],
      passwordConfirm:['',[Validators.required,this.passwordConfirmValidator]]
    });
  }

  passwordConfirmValidator(control: FormGroup){
    return (control.root.value.password==control.value)? null : {'passwordError': {value: 'password mismatch'}};
  }

  submit(){
    if(this.infoForm.valid){
      this.accountService.getUser().subscribe(res => {
        let obj = {
          email: res.json().email,
          oldPassword: this.infoForm.value.oldPassword,
          password: this.infoForm.value.password
        };
        this.accountService.changePwd(obj).subscribe(res => {
          if(res.json() == 'old password incorrect'){
            this.pwdInc = true;
            this.infoForm.reset();
          }else {
            this.infoForm.reset();
          }
        });
      });
    }else {
      this.pwdInc = true;
    }
  }

}
