import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  public feedbackForm: FormGroup;

  private feedbacks;

  private user;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    let fb = new FormBuilder();
    this.feedbackForm = fb.group({
      feedback:['',[Validators.required,Validators.minLength(40)]]
    });

    this.accountService.getUser().subscribe(res => {
      this.user = res.json();
      this.accountService.getFeedbacks(this.user).subscribe(res => {
        this.feedbacks = res.json();
      });
    });


  }

  submit(){
    if(this.feedbackForm.valid){
      let obj = {
        user: this.user,
        feedback: this.feedbackForm.value.feedback
      };
      this.accountService.submitFeedback(obj).subscribe(()=>{
        this.feedbackForm.reset();
        this.accountService.getFeedbacks(this.user).subscribe(res => {
          this.feedbacks = res.json();
        });
      });
    }
  }

}
