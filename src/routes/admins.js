const Admin = require("../models/admin");
const express = require('express');
const Authentication = require('../models/verification');
const { generateOTP } = require("../utils/mail");
const auth = require("../middleware/auth");

const router = new express.Router;

//create admin
router.post('/createAdmin', async (req, res) => {
    try{
        const newAdmin = new Admin(req.body);
        console.log('ji');
        //let otp = '';
        //await newAdmin.save();\
        //const OTP = generateOTP();
        //console.log('otp', OTP)
        //console.log('p');
        // new Authentication({
        //     owner: newAdmin._id,
        //     token: OTP
        // })
        // console.log('ji');
        // await Authentication.save();
        // console.log('ji');
        await newAdmin.save();
        // console.log('ji');
        // const token = await newAdmin.generateAdminAuthToken();
        // console.log(token)
        //  await newAdmin.save();

        console.log(newAdmin);
        res.status(201).send(newAdmin)
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.post('/adminLogin', async (req, res) => {
    try{
        const admin = await Admin.findByCredentails(req.body.email, req.body.password);
        if(!admin){
            throw new Error('Incorrect details')
        }
        res.status(200).send(admin);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get('/admin', auth, async(req, res) => {
    res.send(req.user);
})

module.exports = router