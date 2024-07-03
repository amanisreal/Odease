const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },

    token:{
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
})

verificationSchema.methods.generateOTP = () => {
    let otp;
    for(let i=0;i<=3;i++){
        opt+=Math.round(Math.random()*9);
    }
    return otp;
};

const Authentication = mongoose.model('authentication', verificationSchema);

module.exports = Authentication;