var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fbUserId:        {type: String},
    username:       {type: String},
    lettersDone :   [],
    cuisinesDone:   [],
    restaurantsDone:[]
});

module.exports = mongoose.model('User',UserSchema);