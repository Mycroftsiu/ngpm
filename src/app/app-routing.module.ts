import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ContentComponent} from "./content/content.component";
import {StockManageComponent} from "./stock/stock-manage/stock-manage.component";
import {StockFormComponent} from "./stock/stock-form/stock-form.component";
import {PersonManagementComponent} from "./person/person-management/person-management.component";
import {PersonFormComponent} from "./person/person-form/person-form.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./guard/auth.guard";
import {FeedbackComponent} from "./feedback/feedback.component";
/**
 * Created by mycroft on 2018/1/22.
 */



const appRoutes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin',component:ContentComponent,canActivate:[AuthGuard],children:[
    {path:'stock',component:StockManageComponent},
    {path:'stock/:id',component:StockFormComponent},
    {path:'person',component:PersonManagementComponent},
    {path:'person/:id',component:PersonFormComponent},
    {path:'feedback',component:FeedbackComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'', redirectTo:'dashboard',pathMatch:'full'}
  ]},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
