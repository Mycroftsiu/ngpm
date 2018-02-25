import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username: string;

  constructor(public accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getUser().subscribe(res => {
      this.username = res.json().username;
    });
  }

  signOut(){
    this.accountService.signOut().subscribe();
  }

}
