import {CanActivate, Router} from "@angular/router";
import {AccountService} from "../account.service";
import {Injectable} from "@angular/core";
/**
 * Created by mycroft on 2018/1/28.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  public result: boolean;

  constructor(public accountService: AccountService, public router: Router){}

  canActivate(){
    return this.checkLogin();
  }

  checkLogin(): any{
    this.accountService.isloggedIn().subscribe(res => {
      if(res.json()==true){
        this.router.navigateByUrl('/admin');
        this.result = true;
      }
      else{
        this.router.navigateByUrl('/login');
        this.result = false;
      }
    });
    return this.result;
  }

}
