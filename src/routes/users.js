const express = require('express');

const router = new express.Router;

//here login will create user   
router.post('/login',  async (req, res) => {
    try{
        const newUser = new User(req.body);
        newUser.save();
        res.status(201).send(newUser);
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;