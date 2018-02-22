const express =require('express');
const router=express.Router();
const passport=require('passport');
const Hotel=require('../models/hotel');
const User=require('../models/user');
const Booking=require('../models/bookroom');

router.get('/testing',function(req,res,next){
       if(req.headers.authorization){
      	next();
      }
      else{

      	next('route');
      }
},passport.authenticate('jwt',{session:false}),
function(req,res){
  res.json({user:req.user,authenticated:'Admin'});
});

router.get('/testing',function(req,res){
	 res.json({user:null,authenticated:'USER'});
});



router.post('/hotelregister',function(req,res,next){
  console.log(req.user);
  if(req.isAuthenticated() && req.user.isAdmin){
    let newHotel=new Hotel();

  	newHotel.name=req.body.name;
  	newHotel.address=req.body.address;
  	newHotel.zip=req.body.zip;
  	newHotel.city=req.body.city;
  	newHotel.state=req.body.state;
      newHotel.tariff=req.body.tariff;
      newHotel.roomCount=req.body.roomCount;

  	newHotel.save(function(err){
  		if(err){
  			res.json({success:false,msg:'Failed to Register'});
  		}else{
             res.json({success:true,msg:'Hotel Registered'});
  		}
  	});
 }else{
   res.json({success:false,msg:'not admin'});
 }
});

router.post('/hotelregister',function(req,res,next){
  res.json({success:false,msg:'Not admin'});
});

router.get('/user/bookings',function(req,res){
  if(req.isAuthenticated()){
    res.json({success:true,user:req.user});
  }
});




router.put('/hotelupdate/:id', function (req, res, next) {
    Hotel.findByIdAndUpdate(req.params.id, req.body, function (err, hotel) {
        if (err) return next(err);
        else {
            res.json({hotel:hotel,msg:'Hotel successfully updated'});
        }
    });
});


router.get('/user/:id', function (req, res) {
    var id = request.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            return response.send(err);
        } else {
            var user = res;
            response.json(user);
        }
    });
});


router.get('/user', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.json({user:users,msg:'List of All Users'});
        }
    });
});

router.put('/user/:id', function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        else {
            res.json(user);
        }
    });
});



module.exports=router;
