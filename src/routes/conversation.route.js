const Conversations = require('../models/conversation');
const express = require('express');
const User = require('../models/user');


const router = new express.Router;
//convesation
router.post('/conversation',async(req,res)=>{
    try {
        const {senderId, receiverId} = req.body;
        // console.log("sender",senderId,receiverId)
        const newConversation =await Conversations.create({members:[senderId,receiverId]});
        console.log(newConversation)
        res.status(200).send(newConversation);
    } catch (error) {
        console.log(error,'Error');
    }
})

// get the conversation
router.get('/conversation/:userId',async(req,res) => {
    try {
        const userId = req.params.userId;
       const conversation = await Conversations.find({members: {$in: [userId]}});
       const conversationUserData = await Promise.all(conversation.map(async (conversation) => {
        const receiverId = conversation.members.find((member) => member!==userId);
        return await User.findById(receiverId);
       }))
       console.log(conversationUserData);
       res.status(200).json(conversationUserData);
    } catch (error) {
        console.log(error,'Error');
    }
})

module.exports = router;