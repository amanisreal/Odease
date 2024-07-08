const express = require('express');
const Message = require('../models/messages'); 
const router = new express.Router();
const User = require('../models/user');
const Conversation = require('../models/conversation');

router.post('/message', async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;

        if (!senderId || !message) {
            return res.status(400).send('Please fill all required fields');
        }

        let newMessage;

        if (!conversationId && receiverId) {
            const newConversation = new Conversation({ members: [senderId, receiverId] });
            await newConversation.save();
            newMessage = new Message({ conversationId: newConversation._id, senderId, message });
        }
        else if(!conversationId && !receiverId){
           return res.status(400).send("field all the necessary details");
        }
         else {
            newMessage = new Message({ conversationId, senderId, message });
        }

        await newMessage.save();
        console.log('New message:', newMessage);

        res.status(200).send(newMessage);
    } catch (error) {
        console.error("Message route error:", error);
        res.status(500).send({ error: "Failed to send message" });
    }
});
// router.post('/message', async (req, res) => {
//     try {
//         const { conversationId, senderId, message, receiverId = '' } = req.body;
//         // if(!senderId || !message )return res.status(400).send('Please fill all required fields')
//         // if(!conversationId){
//         //     const newConversation = new Conversation({members: [senderId,receiverId]});
//         //     await newConversation.save();
//         //     const newMessage = new Message({conversationId: newConversation._id,senderId, message});
//         //     await newMessage.save();
//         //     console.log(newMessage)
//         //     return res.status(200).send(newMessage);
//         // }
//             // Create the new message
//         const newMessage = new Message({ conversationId, senderId, message });
        
//         // Save the message to the database
//         await newMessage.save();
//         console.log(newMessage);
//         // Send the saved message as a response
//         res.status(200).send(newMessage);
//     } catch (error) {
//         console.error("Message route error:", error);
//         res.status(500).send({ error: "Failed to send message" });
//     }
// });

// get the message
router.get('/message/:conversationId',async(req,res) => {
    try {
        const conversationId = req.params.conversationId;
        if(conversationId==='new') return res.status(200).json([]);
        const messages = await Message.find({conversationId});
        const messageUserData = Promise.all(messages.map(async (message)=> {
            const user = await User.findById(message.senderId);
            return {user:{userName: user.userName, tableNumber:user.tableNumber},message:message.message};
        }))
        console.log(await messageUserData)
        res.status(200).json(await messageUserData)
    } catch (error) {
        console.log(error,'Error');
    }
})

module.exports = router;
