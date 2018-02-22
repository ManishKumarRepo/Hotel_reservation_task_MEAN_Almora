import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router,NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-hotelregister',
  templateUrl: './hotelregister.component.html',
  styleUrls: ['./hotelregister.component.css']
})
export class HotelregisterComponent implements OnInit {
  user:Object;
  admin:String;

  name:String;
  address:String;
  city:String;
  state:String;
  zip:String;
  tariff:Number;
  numofrooms:Number;

  constructor( private validateService:ValidateService,
  	private authService:AuthService,
  	private router:Router,
  	private flashMessage:FlashMessagesService) {
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
				 return false;
			}

			this.router.events.subscribe((evt) => {
				 if (evt instanceof NavigationEnd) {
						// trick the Router into believing it's last link wasn't previously loaded
						this.router.navigated = false;
						// if you need to scroll back to top, here is the right place
						window.scrollTo(0, 0);
				 }
		 }); }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(profile=>{
      this.user=profile.user;
      this.admin=profile.user.isAdmin;
      if(!this.admin){
        this.router.navigate(['/login']);
      }
    },
    err=>{
      console.log(err);
      return false;
    });
  }

  onRegisterSubmit(){

    const hotel={
      name:this.name,
      address:this.address,
      city:this.city,
      state:this.state,
      zip:this.zip,
      tariff:this.tariff,
      roomCount:this.numofrooms
    };



    this.authService.registerHotel(hotel).subscribe(data=>{
      console.log(data);
      if(data.success){
        this.flashMessage.show(data.msg,{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/']);
      }else{
        this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register_hotel']);
      }
    });




  }

}
