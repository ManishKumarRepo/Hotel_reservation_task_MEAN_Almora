import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import {Router,ActivatedRoute, Params,NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-bookhotel',
  templateUrl: './bookhotel.component.html',
  styleUrls: ['./bookhotel.component.css']
})
export class BookhotelComponent implements OnInit {
	from:Date;
	to:Date;
	numofrooms:Number=0;
	tariff:any;
  hotel_id:any;
  roommsg:String;
  numofdays:Number;
  disable=false;

  hotelname:String;
  hoteltariff:Number;
  hotelRoom:Number;
  hotelAddress:String;



  constructor(private authService:AuthService,
  	private router:Router,
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private activatedRoute:ActivatedRoute) {
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
    const id=this.activatedRoute.snapshot.params["id"];
    this.hotel_id=id;

    this.authService.getHotelById(this.hotel_id).subscribe(data=>{

          this.hotelname=data.name;
          this.hoteltariff=data.tariff;
          this.hotelRoom=data.roomCount;
          this.hotelAddress=data.address+","+data.city+"( "+data.state+" )";
        




    });

  }

  onKey(value:Number) {
    this.tariff = value;
    if(this.from && this.to){
      this.numofdays=this.authService.getDays(new Date(this.from),new Date(this.to));
      if(this.numofdays<0){
        return false;
      }
    }

  }

  changeFrom(from:Date){
    console.log(this.tariff+" tariff");
    this.from=from;
    if(this.from && this.to){
      this.numofdays=this.authService.getDays(new Date(this.from),new Date(this.to));
      if(this.numofdays<0){
        this.from=null;
        this.flashMessage.show('From date can not be greater then To date',{cssClass:'alert-danger',timeout:3000});
      }
    }
  }

  changeTo(to:Date){
    this.to=to;
    if(this.from && this.to){
      this.numofdays=this.authService.getDays(new Date(this.from),new Date(this.to));
      if(this.numofdays<0){
        this.to=null;
        this.flashMessage.show('To date can not be less then From date',{cssClass:'alert-danger',timeout:3000});
      }
    }
  }

  onBookSubmit(event){
 event.preventDefault();
    const Book={
      hotelname:this.hotelname,
      checkInDate:new Date(Date.UTC(new Date(this.from).getFullYear(),new Date(this.from).getMonth(),new Date(this.from).getDate())).toDateString(),
      checkOutDate:new Date(Date.UTC(new Date(this.to).getFullYear(),new Date(this.to).getMonth(),new Date(this.to).getDate())).toDateString(),
      numofrooms:this.numofrooms,
      totalTariff:this.tariff,
      numofdays:this.numofdays
    };

    if(this.numofrooms<1){
       this.flashMessage.show('0 (Zero) rooms cannot be booked',{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    if(this.numofrooms>this.hotelRoom){
      this.flashMessage.show('only '+this.hotelRoom+' rooms are available. choose with in the range',{cssClass:'alert-danger',timeout:3000});
     return false;
    }
    if(!this.validateService.parseDate(new Date(this.from),new Date(this.to))){
      this.flashMessage.show('Select Valid From and To dates',{cssClass:'alert-danger',timeout:3000});
      this.from=this.to=null;
      return false;

    }else{
      this.authService.bookHotel(Book,this.hotel_id).subscribe(data=>{
        this.disable=true;
        if(!data.success){
          this.flashMessage.show('Login First',{cssClass:'alert-danger',timeout:3000});
          this.router.navigate(['/login'],);

        }else{
          this.authService.storage={data:data.book,name:data.name};
          this.flashMessage.show('Booking Confirmed',{cssClass:'alert-success',timeout:3000});
          this.router.navigate(['/dashboard']);

        }


      });
    }


  }

}
