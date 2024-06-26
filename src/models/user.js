const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim:true
    },

    tableNumber: {
        type: String,
        required: true
    },

    tokens: [{
        token: {
            type: String
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'SwiggyWeb');
    user.tokens = user.tokens.concat(token);
    return token;
}

const User = new mongoose.model('user', userSchema);

module.exports = User;