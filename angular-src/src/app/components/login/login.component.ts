import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	email:String;
	password:String;
      returnUrl: string;

  constructor(private validateService:ValidateService,
  	private flashMessage:FlashMessagesService,
  	private authService:AuthService,
  	private router:Router,
    private activatedRoute: ActivatedRoute) {
     }

  ngOnInit() {

  }

  onLoginSubmit(){
  	const user={
  		email:this.email,
  		password:this.password
  	};
    if(!this.validateService.validateLogin(user)){
      this.flashMessage.show('Please Enter the credentials',{cssClass:'alert-danger',timeout:3000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please Enter valid Email',{cssClass:'alert-danger',timeout:3000});
      return false;
    }

    this.authService.loginUser(user).subscribe(data=>{
      console.log(data);
    	if(data.success){
        this.authService.storeUserData(data.token,data.user);
        this.flashMessage.show('you are now Logged In',{cssClass:'alert-success',timeout:3000});
        this.refresh();
        this.router.navigate(['/']);



      }else{
        this.flashMessage.show('Something Went Wrong',{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/login']);
      }
    });




  }
  refresh(): void {
    window.location.reload();
  }



}
