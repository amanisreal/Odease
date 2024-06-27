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
        required: true,
        unique: true,
        validate(value){
            if(Number(value)<=0 && Number(value)>20){
                throw new Error('Invalid table number')
            }
        }
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
    user.tokens = user.tokens.concat({token});
    return token;
}

const User = new mongoose.model('user', userSchema);

module.exports = User;