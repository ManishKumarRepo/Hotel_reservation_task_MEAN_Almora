const express =require('express');
const router=express.Router();
const Hotel=require('../models/hotel');

router.get('/:id', function (req, res) {
    var id = req.params.id;
    Hotel.findById(id, function (err, hotel) {
        if (err) {
            res.send(err).status(404);
        } else {
            res.json(hotel);
        }
    });
});

router.get('/', function (req, res) {
    Hotel.find({}, function (err, hotels) {
        if(err){
			res.json({success:false,msg:'Failed to get hotel list'});
		}else{
           res.json({hotel:hotels,msg:'List of Hotels'});
		}
    });
});

module.exports=router;
