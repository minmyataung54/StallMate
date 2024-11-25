const mongoose = require('mongoose');
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        },
        googleID: { 
            type: String, 
            required: true, 
            unique: true 
        },
        menu: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Menu' 
        },
        profile: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Profile' 
        },
        createdAt: { 
            type: Date, 
            default: Date.now, 
            get: (date) => moment(date).tz('Asia/Bangkok').format() 
        }
    },
    {
        collection: 'StallOwner',
        timestamps: false, 
        versionKey: false, 
        toJSON: { 
            getters: true,
            transform: function (doc, ret) {
                delete ret.id;
                return ret;
            }
        },
        toObject: { 
            getters: true,
            transform: function (doc, ret) {
                delete ret.id;
                return ret;
            }
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;