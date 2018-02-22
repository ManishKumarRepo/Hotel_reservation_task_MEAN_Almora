var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var BookHotel =require('../models/bookroom');
var HotelRef=require('../models/hotel');


var userSchema = new Schema({
    email        : {required: true, unique: true, type: String },
    password     : {required: true, type: String },
    firstName    : {required: true, type: String },
    lastName     : {required: true, type: String },
    isAdmin      : {default: false, type: Boolean},
    bookedHotel  : [{type: Schema.Types.ObjectId, ref: 'BookHotel',default:null}]
});





userSchema.methods.bookHotel=function(hotel,cb){
  var bookHotel=new BookHotel();
  bookHotel.numofrooms=hotel.numofrooms;
  bookHotel.totalTariff=hotel.totalTariff;
  bookHotel.checkInDate=hotel.checkInDate;
  bookHotel.checkOutDate=hotel.checkOutDate;
  bookHotel.numofdays=hotel.numofdays;
  bookHotel.user=this._id;
  bookHotel.hotel=hotel.hotel_id;
  this.bookedHotel.unshift(bookHotel._id);


  this.save(function(err){
  	if(err)
  		{throw err;}
  	else{
  		bookHotel.save(function(err){
        if(err){throw err}
         HotelRef.findById(hotel.hotel_id,function(err,hotelref){

          hotelref.bookHotel(hotel.numofrooms,function(err){
            cb(err,bookHotel);
          });
         });

  		});
  	}

  });
}

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


userSchema.methods.removeUser=function(cb){
  this.remove({_id:this._id},cb);
}

module.exports = mongoose.model('User', userSchema);
