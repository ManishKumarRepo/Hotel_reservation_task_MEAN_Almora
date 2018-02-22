import { Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public username;
	hotels=[];

  constructor(private authService:AuthService,
  private router:Router){

  }

  ngOnInit() {
    if(this.authService.loggedIn()){
      this.authService.storage=null;
    }
  	this.authService.getHotels().subscribe(data=>{
      this.hotels=data.hotel;
    });

  }

  refresh(): void {
    window.location.reload();
  }



}
