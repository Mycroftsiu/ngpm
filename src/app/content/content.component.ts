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
          this.desc = 'Simple and neat';
        }else if(event.url.startsWith('/admin/stock')) {
          this.title = this.rightInfo = 'Stock Management';
          this.desc = 'Easy and swift';
        }else if(event.url.startsWith('/admin/person')) {
          this.title = this.rightInfo = 'Person Management';
          this.desc = 'Comfortable and pretty';
        }
      });
  }

  ngOnInit() {

  }

}
