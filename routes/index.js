const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');

const config=require('../config/db');
const User=require('../models/user');

// Register
router.post('/register',function(req,res){
	console.log("THIS ROUTE REGOISTER CALLED");
	let newuser=new User();

	newuser.email=req.body.email;
	newuser.password=newuser.generateHash(req.body.password);
	newuser.firstName=req.body.firstName;
	newuser.lastName=req.body.lastName;
	newuser.isAdmin=req.body.isAdmin;

	newuser.save(function(err){
		if(err){
			res.json({success:false,msg:'Failed to Register'});
		}else{
           res.json({success:true,msg:'user Registered'});
		}
	})
});

// Login
router.post('/authenticate',function(req,res){
	const username=req.body.email;
	const password=req.body.password;

	User.findOne({'email':username},function(err,user){
		if(err) throw err;
		if(!user){
			return res.json({success:false,msg:'User not Found'});
		}
       
		if(user.validPassword(password)){
			const token=jwt.sign({data:user},config.secret);
			res.json({success:true ,
				token:`Bearer ${token}`,
				user:{
			    	id:user._id,
			    	name:user.firstName+' '+user.lastName,
			    	email:user.email,
			    	admin:user.isAdmin
			    }})
		}else{
			res.json({success:false,msg:'wrong Password'});
		}
	});
});



//Profile
router.get('/profile',function(req,res){
	res.json({user:req.user});
});

//Validate
router.get('/logout',passport.authenticate('jwt',{session:false}),function(req,res){
	req.logout();
	res.redirect('/user/profile');
});

module.exports=router;