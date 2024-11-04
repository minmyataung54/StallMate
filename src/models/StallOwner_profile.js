const mongoose = require('mongoose');
const moment = require('moment-timezone');

const openingHoursSchema = new mongoose.Schema({
    weekday: { type: String, required: true },
    open_time: { type: String, required: true },
    close_time: { type: String, required: true }
},{_id: false});

const contactSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true }
},{_id: false});

const locationSchema = new mongoose.Schema({
    address: { type: String, required: true },
    city : { type: String, required: true },
    state : { type: String, required: true },
},{_id: false});

const ratingSchema = new mongoose.Schema({
    average: { type: Number, default: 0 },
    number_of_reviews: { type: Number, default: 0 }
}, { _id: false });

const restaurantSchema = new mongoose.Schema({
    name : { type: String, required: true },
    photo : {type : String},
    location : locationSchema,
    opening_hours : [openingHoursSchema],
    contact : contactSchema,
    rating : ratingSchema
}, {_id: false});

const stallOwnerProfileSchema = new mongoose.Schema({
    StallOwnerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    owner_profile : {
        full_name: { type: String, required: true },
        profile_photo : {type : String}
    },
    restaurant : restaurantSchema
}, {
    collection: 'StallOwner_profile',
    timestamps: false,
    versionKey: false,
    toJSON: {
        getters: true,
        transform: function(doc, ret) {
            delete ret.id;
            return ret;
        }
    },
    toObject: {
        getters: true,
        transform: function(doc, ret) {
            delete ret.id;
            return ret;
        }
    }
});

const StallOwnerProfile = mongoose.model('StallOwnerProfile', stallOwnerProfileSchema);
module.exports = StallOwnerProfile;