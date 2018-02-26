import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menus: Array<Menu>;

  private nameFilter: FormControl = new FormControl();

  private keyword: string;

  private user: any = {};

  constructor(public accountService: AccountService) {
  }

  ngOnInit() {
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(val => {
        this.keyword = val.toLowerCase();
      });
    this.accountService.getUser().subscribe(res => {
      this.user = res.json();
      if(this.user.position == 'Admin'){
        this.menus = [
          new Menu("Dashboard","dashboard"),
          new Menu("Person Management","person"),
          new Menu("Feedback Aggregation","fbAggregation")
        ]
      } else if(this.user.position == 'Staff') {
        this.menus = [
          new Menu("Dashboard","dashboard"),
          new Menu("Feedback",'feedback')
        ]
      }

    });

  }
}

export class Menu {
  constructor(
    private name: string,
    private link: string
  ){

  }
}
