import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-edituser',
	templateUrl: './edituser.component.html',
	styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
	paramid:String;
	numofdays:any=[];
	userdetails:any;
	userbookings:any=[];

	constructor(private authService:AuthService,
		private router:Router,
		private flashMessage:FlashMessagesService,
		private activatedRoute:ActivatedRoute) { }


	ngOnInit() {
		if(!this.authService.loggedIn()){
			this.router.navigate(['/login']);
		}else{
			this.authService.getCurrentUser().subscribe(data=>{
				if(data.user.isAdmin){
					this.paramid=this.activatedRoute.snapshot.params["id"];

					this.authService.getUserById(this.paramid).subscribe(data=>{
						this.userdetails=data.user;
						this.authService.getBookingsByUser(this.userdetails._id).subscribe(data=>{
							this.userbookings=data.book;
						});
					});
				}else{
					this.router.navigate(['/login']);
				}
			});
		}
	}

	 cancelBooking(bookingid,userid){
    this.authService.deletAdminBooking(bookingid,userid).subscribe(data=>{
      console.log("cance booking  "+JSON.stringify(data));
      if(data.success){
        this.flashMessage.show('booking is cancelled successfully',{cssClass:'alert-success',timeout:3000});
        this.refresh();
      }else{
        this.flashMessage.show('booking is not cancelled ..some problem occurred',{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/login']);
      }
    });
  }

  deleteUserClick(id){
  	this.authService.deleteUser(id).subscribe(data=>{
  		  console.log(data);
					if(data.success){
						this.flashMessage.show('deleted user successfully',{cssClass:'alert-success',timeout:3000});
						this.router.navigate(['/allusers']);
					}else{
						this.flashMessage.show(data.msg,{cssClass:'alert-success',timeout:5000});
						this.refresh();
					}

				});
  }

  refresh(): void {
    window.location.reload();
}

}
