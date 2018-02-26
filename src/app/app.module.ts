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
import {AppRoutingModule} from "./app-routing.module";
import {AuthGuard} from "./guard/auth.guard";
import { FeedbackComponent } from './feedback/feedback.component';



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
    RegisterComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [StockService, PersonServiceService, AccountService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
