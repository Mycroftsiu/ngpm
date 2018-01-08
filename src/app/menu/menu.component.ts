import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menus: Array<Menu>;

  public selected: number;

  private nameFilter: FormControl = new FormControl();

  private keyword: string;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.menus = [
      new Menu(1,"Dashboard","dashboard"),
      new Menu(2,"Stock Management","stock"),
      new Menu(3,"Person Management","person")
    ];
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(val => {
        this.keyword = val.toLowerCase();
      });
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd) => {
        if(event.url == '/dashboard' || event.url == '/'){
          this.selected = 1;
        }
        else if(event.url.startsWith('/stock')) {
          this.selected = 2;
        }else if(event.url.startsWith('/person')) {
          this.selected = 3;
        }
      })
  }
}

export class Menu {
  constructor(
    private id: number,
    private name: string,
    private link: string
  ){

  }
}
