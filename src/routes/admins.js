const { JsonWebTokenError } = require("jsonwebtoken");
const Admin = require("../models/admin");

const express = require(express);

const router = new express.Router;

//create admin
router.post('/createAdmin', async (req, res) => {
    try{
        const newAdmin = new Admin(req.body);
        const token = newAdmin.generateAuthToken();
        await newAdmin.save();
        res.status(201).send({newAdmin, JsonWebTokenError})
    }
    catch(e){
        res.status(400).send(e);
    }
})

module.exports = router