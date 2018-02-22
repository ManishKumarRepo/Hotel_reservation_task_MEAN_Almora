import { Component, OnInit,Input } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   username:String;
  isAdmin:Boolean;
  constructor(private authService:AuthService,
  	private flashMessage:FlashMessagesService,
  	private router:Router) {
    }

  ngOnInit() {
    if(!this.username){

      this.authService.getCurrentUser().subscribe(data=>{
        this.username=data.user.firstName+' '+data.user.lastName;
        this.isAdmin=data.user.isAdmin;
      });

    }
}

  onLogoutClick(){
    this.isAdmin=false;
    this.username="";
    this.authService.logout();
    this.flashMessage.show('You are Successfully Logged out',{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/login']);
  }

  refresh(): void {
    window.location.reload();
  }

}
