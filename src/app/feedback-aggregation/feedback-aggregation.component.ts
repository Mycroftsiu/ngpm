import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-feedback-aggregation',
  templateUrl: './feedback-aggregation.component.html',
  styleUrls: ['./feedback-aggregation.component.css']
})
export class FeedbackAggregationComponent implements OnInit {

  public user: any;

  public feedbacks;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getUser().subscribe(res => {
      this.user = res.json();
      this.accountService.getFeedbacks(this.user).subscribe(res => {
        this.feedbacks = res.json();
      });
    });
  }

}
