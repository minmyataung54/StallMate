const mongoose = require('mongoose');
// const schema = mongoose.Schema; 
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    googleID: {type: String, required: true, unique: true},
    createdAt: { 
        type: Date, 
        default: () => moment().tz('Asia/Bangkok').toDate()
    } 
    
}, {collection: 'Login'});

const User = mongoose.model('user',userSchema);
module.exports = User;