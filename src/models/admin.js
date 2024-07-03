const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs')

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

adminSchema.pre('save', async function(next){
    const admin = this;
    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password, 8);
    }
    next();
})

adminSchema.methods.generateAdminAuthToken = async function(){
    const admin = this;
    const token = jwt.sign({_id: admin._id.toString()}, 'SwiggyWeb');
    //console.log(token)
    admin.tokens = admin.tokens.concat({token});
    //console.log('ends')
    return token;
}

adminSchema.statics.findByCredentails = async function (email, password){
    console.log('ji')
    console.log(email, password);
    const admin = await Admin.findOne({email: email});
    console.log(admin);
    if(!admin){
        throw new Error('No such admin exists')
    } 
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch){
        throw new Error('Something went worng from yourside');
    } 
    return admin;
}

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;