const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth')

const router = new express.Router;


//here login will create user   
router.post('/login',  async (req, res) => {
    
res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body)
    try{
        const newUser = new User(req.body);
        newUser.save();
        const authToken = await newUser.generateAuthToken();
        res.status(201).send({newUser, authToken});
    }catch(e){
        res.status(400).send(e);
    }
})

//get the user;
router.get('/user', auth, async (req, res) => {
    const user = req.user;
    const token = req.token;
    try{
        res.status(200).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})

//log out the user
router.post('/user', auth, async(req, res) => {
    try{
        const user = await User.findByIdAndDelete({_id: req.user._id});
        res.status(200).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;