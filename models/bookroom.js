
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var bookingSchema = new Schema({
    totalTariff            : Number,
    numofrooms             : Number,
    numofdays               :Number,
    checkInDate            :{ type: Date, default: Date.now },
    checkOutDate           : { type: Date, default: Date.now },
    hotel                  : { type: Schema.Types.ObjectId, ref: 'Hotel' },
    user                   : { type: Schema.Types.ObjectId, ref: 'User' }
});



module.exports = mongoose.model('Booking', bookingSchema);
