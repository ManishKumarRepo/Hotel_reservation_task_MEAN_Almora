var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var hotelSchema = new Schema({
    name         : String,
    address      : String,
    zip          : String,
    city         : String,
    state        : String,
    tariff         : Number,
    roomCount    : Number
});


hotelSchema.methods.cancelHotel = function(room,callback) {
    this.roomCount += room;
    this.save(callback);
};


hotelSchema.methods.bookHotel = function(room,callback) {
    this.roomCount -= room;
    this.save(callback);
};

module.exports = mongoose.model('Hotel', hotelSchema);
