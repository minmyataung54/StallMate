const mongoose = require('mongoose');
// const schema = mongoose.Schema; 

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    googleID: {type: String, required: true, unique: true},
    
});

const User = mongoose.model('user',userSchema);
module.exports = User;