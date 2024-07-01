const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim:true
    },

    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter A VALID EMAIL')
            }
        }
    },

    password: {
        type: String,
        required: true,
        validate(value){
            if(value.length < 6) {
                throw new Error('Password length must be more than 6 letters')
            }
        }
    },

    tokens: [{
        token: {
            type: String
        }
    }]
})

adminSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'SwiggyWeb');
    user.tokens = user.tokens.concat(token);
    return token;
}

const User = mongoose.model('admin', adminSchema);

module.exports = User;