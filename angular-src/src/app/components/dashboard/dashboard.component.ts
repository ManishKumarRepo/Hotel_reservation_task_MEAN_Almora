import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router,NavigationEnd} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any;
  admin:String;
  storage:any;
  previousBookings:any=[];
  constructor(private authService:AuthService,
  	private router:Router,
    private flashMessage:FlashMessagesService) {
      // override the route reuse strategy
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
      });
 }

  ngOnInit() {
    if(!this.authService.loggedIn()){
        this.router.navigate(['/login']);
    }
    this.authService.getCurrentUser().subscribe(profile=>{
      this.user=profile.user;
      this.admin=profile.user.isAdmin;
      this.storage=this.authService.storage;
      this.authService.getBookingsByUser(this.user._id).subscribe(data=>{
      this.previousBookings=data.book;
      console.log(data.book);
    });
    },
    err=>{
      console.log(err);
      return false;
    });


  }

  cancelBooking(id){
    this.authService.deleteBooking(id).subscribe(data=>{
      if(data.success){
        this.flashMessage.show('booking is cancelled successfully',{cssClass:'alert-success',timeout:3000});
        this.refresh();
      }else{
        this.flashMessage.show('booking is not cancelled ..some problem occurred',{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/login']);
      }
    });
  }

  refresh(): void {
    window.location.reload();
}

}
