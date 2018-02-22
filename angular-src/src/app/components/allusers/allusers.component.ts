import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router,NavigationEnd} from '@angular/router';
@Component({
	selector: 'app-allusers',
	templateUrl: './allusers.component.html',
	styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

	user:Object;
	admin:String;
	allUsers:any=[];

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
		 });
	 }

	ngOnInit() {
		this.authService.getProfile().subscribe(profile=>{
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

		this.authService.getAllUsers().subscribe(res=>{
			this.allUsers=res.data;
		});
	}

	deleteUserClick(id){
  	this.authService.deleteUser(id).subscribe(data=>{
  		  console.log(data);
					if(data.success){
						this.flashMessage.show('deleted user successfully',{cssClass:'alert-success',timeout:3000});
						this.refresh();

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
