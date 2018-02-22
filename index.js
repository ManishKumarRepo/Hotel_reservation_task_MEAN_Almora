const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const async=require('async');
const passport=require('passport');
//const session=require('express-session');

const config=require('./config/db');

mongoose.Promise=global.Promise;

mongoose.connect(config.url);



const users=require('./routes/index');
const securedapi=require('./routes/secured');
const admin=require('./routes/adminroute');
const hotel=require('./routes/hotel-api');



const app=express();

const port=3000;

//CORS
app.use(cors());

//Express Static 
app.use(express.static(path.join(__dirname,'public')));

//Body Parser Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/user',users);
app.use('/secured',securedapi);
app.use('/admin',admin);
app.use('/hotel',hotel);


//Index route
app.get('/',function(req,res){
	res.send('INVALID');
});


app.listen(port,function(){
	console.log("Server Running on port "+port);
});