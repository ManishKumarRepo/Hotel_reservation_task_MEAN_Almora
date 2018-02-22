import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

import {AuthGuard} from './guards/auth.guard';
import { HotelregisterComponent } from './components/hotelregister/hotelregister.component';
import { BookhotelComponent } from './components/bookhotel/bookhotel.component';
import { AllusersComponent } from './components/allusers/allusers.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { DeleteuserComponent } from './components/deleteuser/deleteuser.component';

const appRoutes:Routes=[
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'register/hotel',component:HotelregisterComponent},
  {path:'book/hotel/:id',component:BookhotelComponent,canActivate:[AuthGuard]},
  {path:'allusers',component:AllusersComponent,canActivate:[AuthGuard]},
  {path:'edituser/:id',component:EdituserComponent,canActivate:[AuthGuard]},
  {path:'admin/deleteuser/:id',redirectTo:'/dashboard',canActivate:[AuthGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    HotelregisterComponent,
    BookhotelComponent,
    AllusersComponent,
    EdituserComponent,
    DeleteuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
