const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId:{
        type:Array
    },
    senderId: {
           type: String,
    },
    message: {
        type:String,
    }
});

const Messages = mongoose.model('Message',messageSchema);
module.exports =  Messages;