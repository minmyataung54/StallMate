const mongoose = require('mongoose');
const CATEGORIES = require('./categoryEnum');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    name_en : {type: String},
    description: { type : String, required: true},
    description_en : {type: String},
    price: { type: Number, required: true },
    imageUrl : { type : String, required: true},
    category : { type : String, required: true, enum: Object.values(CATEGORIES), default: 'Main Dish'},
    
});

const menuSchema = new mongoose.Schema({
    seller: { type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [menuItemSchema],
    qrcode_url : { type : String , required: true},
}, {collection: 'Menu'});

menuSchema.methods.getItemsByCategory = function(category) {
    return this.items.filter(item => item.category === category);
};

menuSchema.methods.getUsedCategories = function(){
    return [...new Set(this.items.map(item => item.category))];
}

const Menu = mongoose.model('Menu',menuSchema);
module.exports = { Menu, CATEGORIES};