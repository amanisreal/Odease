const User = require("../models/user");

const express = require(express);

const router = new express.Router;

//get all the users //for developer
router.get('/users', async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})


//post a user
router.post('/user', async (req, res) => {
    const newUser = new User(req.body);
    try{
        await newUser.save();
        const token = newUser.generateAuthToken();
        res.status(201).send({newUser, token});
    }catch(e){  
        res.status(400).send(e);
    }
})

//update a user
router.patch('/user/', async (req, res) => {
    
})