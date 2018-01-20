import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { StockManageComponent } from './stock/stock-manage/stock-manage.component';
import { StarsComponent } from './stars/stars.component';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';
import { StockService } from "./stock/stock.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StockFilterPipe } from './stock/stock-filter.pipe';
import {HttpModule} from "@angular/http";
import { PersonManagementComponent } from './person/person-management/person-management.component';
import {PersonServiceService} from "./person/person-service.service";
import { PersonFormComponent } from './person/person-form/person-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AccountService} from "./account.service";

const appRoute: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin',component:ContentComponent,children:[
    {path:'stock',component:StockManageComponent},
    {path:'stock/:id',component:StockFormComponent},
    {path:'person',component:PersonManagementComponent},
    {path:'person/:id',component:PersonFormComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'', redirectTo:'dashboard',pathMatch:'full'}
  ]},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    StockManageComponent,
    StarsComponent,
    DashboardComponent,
    StockFormComponent,
    StockFilterPipe,
    PersonManagementComponent,
    PersonFormComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [StockService, PersonServiceService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
