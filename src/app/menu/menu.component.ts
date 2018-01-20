import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menus: Array<Menu>;

  private nameFilter: FormControl = new FormControl();

  private keyword: string;

  constructor() {
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
