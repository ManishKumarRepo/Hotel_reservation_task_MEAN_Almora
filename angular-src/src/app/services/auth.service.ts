import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken:any;
  user:any;
  storage:any;

  constructor(private http:Http) { }

  registerUser(user){
  	let headers=new Headers();
  	headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/user/register', user,{headers: headers})
      .map(res => res.json());
  }

   registerHotel(hotel){
  	let headers=new Headers();
        this.loadToken();

  	headers.append('Content-Type','application/json');
        headers.append('Authorization',this.authToken);

  return this.http.post('http://localhost:3000/secured/hotelregister', hotel,{headers: headers})
      .map(res => res.json());
  }

  loginUser(user){
  	let headers=new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('http://localhost:3000/user/authenticate',user,{headers:headers})
  	.map(res=>res.json());
  }

  getCurrentUser(){
    let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/secured/current/user',{headers:headers})
    .map(res=>res.json());
  }

  getProfile(){
  	let headers=new Headers();
  	this.loadToken();
  	headers.append('Content-Type','application/json');
  	headers.append('Authorization',this.authToken);
  	return this.http.get('http://localhost:3000/secured/current/user',{headers:headers})
  	.map(res=>res.json());
  }

  getHotels(){
  	let headers=new Headers();
  	this.loadToken();
  	headers.append('Content-Type','application/json');
  	headers.append('Authorization',this.authToken);
  	return this.http.get('http://localhost:3000/hotel',{headers:headers})
  	.map(res=>res.json());
  }

  getAllUsers(){
    let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/secured/admin/allusers',{headers:headers})
    .map(res=>res.json());
  }
  getUserById(id){
    let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/secured/user/'+id,{headers:headers})
    .map(res=>res.json());
  }

   getHotelById(id){
  let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/hotel/'+id,{headers:headers})
    .map(res=>res.json());
   }

   getBookingsByUser(id){
     let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/secured/user/bookings/'+id,{headers:headers})
    .map(res=>res.json());
   }

  bookHotel(hotel,id){
  	let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
  	headers.append('Authorization',this.authToken);

    return this.http.post('http://localhost:3000/secured/hotel/'+id, hotel,{headers: headers})
      .map(res => res.json());
  }
  deleteUser(id){
    let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);

    return this.http.delete('http://localhost:3000/secured/admin/deleteuser/'+id,{headers: headers})
      .map(res => res.json());
  }

  deleteBooking(id){
    let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);

    return this.http.delete('http://localhost:3000/secured/user/booking/'+id,{headers: headers})
      .map(res => res.json());
  }

  deletAdminBooking(bookingid,userid){
    let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);

    return this.http.delete('http://localhost:3000/secured/admin/booking/'+bookingid+'/'+userid,{headers: headers})
      .map(res => res.json());
  }

  storeUserData(authtoken,user){
   localStorage.setItem('id_token',authtoken);
   localStorage.setItem('user',JSON.stringify(user));
   this.authToken=authtoken;
   this.user=user;

  }

  loggedIn(){
  	return tokenNotExpired('id_token');
  }

  logout(){
  	this.authToken=null;
  	this.user=null;
    this.storage=null;
  	localStorage.clear();
  }

  loadToken(){
  	const token=localStorage.getItem('id_token');
  	this.authToken=token;

  }

  getDays(from:Date,to:Date){

    var start = Math.floor(from.getTime() / (3600 * 24 * 1000));
var end = Math.floor(to.getTime() / (3600 * 24 * 1000));
var daysDiff = end - start;
console.log(daysDiff);
return daysDiff;
  }

}
