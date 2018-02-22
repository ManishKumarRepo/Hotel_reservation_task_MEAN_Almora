var express=require('express');
var router=express.Router();
var passport=require('passport');
const Hotel=require('../models/hotel');
const User=require('../models/user');
const Booking=require('../models/bookroom');
const async=require('async');



router.use(passport.authenticate('jwt',{session:false}));

router.get('/profile',function(req,res){
	if(req.isAuthenticated()){
		res.json({user:req.user});
	}
	res.json({user:null});
});


router.get('/current/user',function(req,res){
  if(req.isAuthenticated()){
    res.json({success:true ,user:req.user});
  }else{
    res.json({success:false});
  }
});
router.get('/profile',function(req,res){
	res.json({user:req.user});
});

router.post('/hotel/:id',function(req,res){
  if(req.isAuthenticated()){
    const hotel_id=req.params.id;
    const hotelname=req.body.hotelname;
    const numofrooms=req.body.numofrooms;
    const checkInDate=req.body.checkInDate;
    const checkOutDate=req.body.checkOutDate;
    const totalTariff=req.body.totalTariff;
    const numofdays=req.body.numofdays;


    const booking={
      hotel_id:hotel_id,
      hotelname:hotelname,
      numofrooms:numofrooms,
      totalTariff:totalTariff,
      checkInDate:checkInDate,
      checkOutDate:checkOutDate,
      numofdays:numofdays

    };

    User.findById(req.user._id,function(err,user){
      if(err){ res.json({msg:'hotel Booked',success:false});}
      if(!user){
        res.json({msg:"usrnot found",success:false});
      }else{
        user.bookHotel(booking,function(err,booked){
          if(err){
            res.json({msg:"error",success:false});
          }
          res.json({msg:'hotel Booked',name:hotelname,book:booked,success:true});
        });
      }
    });
  }else{
    res.json({success:false});
  }


});

router.get('/user/bookings/:id',function(req,res){

  if(req.isAuthenticated()){
    Booking.
    find({user:req.params.id})
    .exec(function(err,booking){
      if(err) return handleError(err);

      res.json({success:true,msg:'All Bookings',book:booking});
    });
  }else{
    res.json({success:false,msg:'Login to see Bookings'});
  }
});

router.delete('/user/booking/:id',function(req,res){
  if(req.isAuthenticated()){
    const bookingid=req.params.id;
    User.findById({_id:req.user._id},function(err,user){

      user.bookedHotel.splice(user.bookedHotel.indexOf(req.params.id),1);
      user.save(function(err){
        if(err) return handleError(err);
        Booking.findById(req.params.id,function(err,booking){
          if(!booking){
            res.json({succses:false});
          }
          if(booking){
            Hotel.findById(booking.hotel,function(err,hotel){
              if(err) return handleError(err);
              if(hotel){
                hotel.cancelHotel(booking.numofrooms,function(err){
                  if(err) return handleError(err);
                  Booking.remove({_id:req.params.id},function(err){
                    if(err) return handleError(err);
                    res.json({success:true});
                  });
                });
              }

            });
          }

        });
      });

    });
  }else{
    res.json({success:false,msg:'Cannot cancel booking'});
  }

});

router.post('/hotelregister',function(req,res,next){
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


router.delete('/admin/booking/:id/:userid',function(req,res){
  if(req.isAuthenticated() && req.user.isAdmin){
    const bookingid=req.params.id;
    User.findById({_id:req.params.userid},function(err,user){
      user.bookedHotel.splice(user.bookedHotel.indexOf(req.params.id),1);
      console.log(user.bookedHotel);
      user.save(function(err){
        if(err) return handleError(err);
        Booking.findById(req.params.id,function(err,booking){
          if(!booking){
            res.json({succses:false});
          }
          if(booking){
            Hotel.findById(booking.hotel,function(err,hotel){
              if(err) return handleError(err);
              if(hotel){
                hotel.cancelHotel(booking.numofrooms,function(err){
                  if(err) return handleError(err);
                  Booking.remove({_id:req.params.id},function(err){
                    if(err) return handleError(err);
                    res.json({success:true});
                  });
                });
              }

            });
          }

        });
      });

    });
  }else{
    res.json({success:false,msg:'Cannot cancel booking'});
  }

});



router.get('/admin/allusers',function(req,res){
  if(req.isAuthenticated() && req.user.isAdmin){
    User.find()
    .exec(function(err,user){
      res.json({data:user});
    });
  }
  else{
    res.json({sucess:false});
  }
});

router.get('/user/:id',function(req,res){
  if(req.isAuthenticated() && req.user.isAdmin){
    User.findById(req.params.id,function(err,user){
      if(err) return handleError(err);
      res.json({success:true,user:user});
    });
  }else{
    res.json({sucess:false});
  }
});


router.delete('/admin/deleteuser/:id',function(req,res){
  if(req.isAuthenticated() && req.user.isAdmin){
    if(req.params.id==req.user._id){
      console.log("user equals "+req.params.id==req.user._id);
      res.json({success:false,msg:"You cannot delete Yourself"});
    }else{

      User.findById(req.params.id,function(err,user){
        if(user.bookedHotel.length>0){
            Booking.find({user:req.params.id},function(err,booking){
       async.each(booking,function(item,callback){
          Booking.findById(item._id,function(err,bookingitem){
            Hotel.findById(bookingitem.hotel,function(err,hotelitem){
                  if(hotelitem){
                  hotelitem.cancelHotel(bookingitem.numofrooms,function(err){
                    if(err) return handleError(err);
                    Booking.remove({_id:item.id},function(err){
                      if(err) return handleError(err);
                      user.removeUser(function(err){
                        callback();
                      });
                    });
                  });
                }
            });
          });
       },function(err){
            res.json({success:true,msg:"user successfully deleted"});
       });
    });
        }else{
          User.remove({_id:req.params.id},function(err){
            res.json({success:true,msg:"user successfully deleted"});
          });
        }
      });
    }


 }
});

function calback(req,res,next){
  return next();
}

module.exports=router;
