const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type : String},
    price: { type: Number, required: true },
    imageUrl : { type : String, required: true},
});

const menuSchema = new mongoose.Schema({
    seller: { type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [menuItemSchema],
}, {collection: 'Menu'})

const Menu = mongoose.model('Menu',menuSchema);
module.exports = Menu;