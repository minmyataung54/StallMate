const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    customerID : { type : mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
    stallownerID : {type : mongoose.Schema.Types.ObjectId, ref : 'User', required: true},
}, {timestamp : true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;