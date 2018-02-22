import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   email:String;
   password:String;
   firstName:String;
   lastName:String;
   isAdmin:Boolean;

  constructor(private validateService:ValidateService ,
  	          private flashMessage:FlashMessagesService,
  	          private authService:AuthService,
  	          private router:Router) { }

  ngOnInit() {
    if(this.authService.loggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }

  onRegisterSubmit(){
    const user={
    	email:this.email,
    	password:this.password,
    	firstName:this.firstName,
    	lastName:this.lastName,
    	isAdmin:this.isAdmin
    };
     
    //Required Fields
    if(!this.validateService.validateRegister(user)){
    	this.flashMessage.show('Please Enter the credentials',{cssClass:'alert-danger',timeout:3000});
    	return false;
    	
    }

    // validate Email
    if(!this.validateService.validateEmail(user.email)){
         this.flashMessage.show('Please Enter valid email',{cssClass:'alert-danger',timeout:3000});

    	return false;
    	}


    //Register User
     this.authService.registerUser(user).subscribe(data=>{
     	if(data.success){
     		
this.flashMessage.show('you are now registered and can Log In',{cssClass:'alert-success',timeout:3000});
     	this.router.navigate(['/login']);
     	}else{
  this.flashMessage.show('SomeThing Went Wrong',{cssClass:'alert-danger',timeout:3000});
     	this.router.navigate(['/register']);
     	}
     });
  }

  

}
