const mongoose = require('mongoose');
// const schema = mongoose.Schema; 
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    googleID: {type: String, required: true, unique: true},
    menu : {
        type: mongoose.Schema.Types.ObjectId, ref : 'Menu'
    },
    createdAt: { 
        type: Date, 
        default: () => moment().tz('Asia/Bangkok').toDate()
    } 
        
}, {collection: 'StallOwner'});

const User = mongoose.model('User',userSchema);
module.exports = User;