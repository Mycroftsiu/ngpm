import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit() {
  }

  signOut(){
    this.accountService.signOut().subscribe();
  }

}
