import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/filter'


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

   title: string;
   desc: string;
   rightInfo: string;

  constructor(public router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd) => {
        if(event.urlAfterRedirects ==  '/admin/dashboard'){
          this.title = this.rightInfo = 'Dashboard';
          this.desc = 'Simple and Neat';
        }else if(event.url.startsWith('/admin/stock')) {
          this.title = this.rightInfo = 'Stock Management';
          this.desc = 'Easy and Swift';
        }else if(event.url.startsWith('/admin/person')) {
          this.title = this.rightInfo = 'Person Management';
          this.desc = 'Comfortable and Pretty';
        }else if(event.urlAfterRedirects ==  '/admin/feedback') {
          this.title = this.rightInfo = 'Feedback';
          this.desc = 'Democratic and Peaceful';
        }else if(event.urlAfterRedirects ==  '/admin/fbAggregation') {
          this.title = this.rightInfo = 'Feedback Aggregation';
          this.desc = 'Democratic and Peaceful';
        }else if(event.urlAfterRedirects ==  '/admin/infoUpdate') {
          this.title = this.rightInfo = 'Information Revision';
          this.desc = 'Profile Update';
        }

      });
  }

  ngOnInit() {

  }

}
