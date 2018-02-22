import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
  	if(user.firstName==undefined || user.email==undefined || user.lastName==undefined || user.password ==undefined ){
  		return false;
  	}
  	else{
  		return true;
  	}
  }

  validateEmail(email){
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateLogin(user){
  	if(user.email==undefined ||user.password ==undefined ){
  		return false;
  	}
  	else{
  		return true;
  	}
  }

  validateHotelRegister(hotel){
    if(hotel.name==undefined || hotel.city==undefined || hotel.address==undefined || hotel.state==undefined || hotel.tariff==undefined || hotel.numofrooms==undefined){
    	return false;
    }else{
    	return true;
    }
  }

  validateNumber(num){
  	if(isNaN(num)){
  		return false;
  	}else{
  		return true;
  	}
  }



  parseDate(from:Date,to:Date){
    const date=new Date();
    console.log(date);
   if((from>=date) || (from==undefined) ||( to== undefined )|| ((from.getFullYear()>to.getFullYear()) && (from.getMonth()<=to.getMonth()) && (from.getDate()<=to.getDate()))){
     return true;
   }else{

     return false;
   }
  }

}
