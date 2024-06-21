const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = mongoose.Schema({
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
    }
})

const User = new mongoose.model('user', userSchema);

module.exports = User;