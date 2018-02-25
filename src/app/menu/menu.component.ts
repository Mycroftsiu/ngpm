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

  private username: string;

  constructor(public accountService: AccountService) {
  }

  ngOnInit() {
    this.menus = [
      new Menu("Dashboard","dashboard"),
      // new Menu("Stock Management","stock"),
      new Menu("Person Management","person")
    ];
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(val => {
        this.keyword = val.toLowerCase();
      });
    this.accountService.getUser().subscribe(res => {
      this.username = res.json().username;
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
