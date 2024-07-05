const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    members:{
        type:[],
        required: true,
    }
});

const Conversation = mongoose.model('Conversation',conversationSchema);
module.exports =  Conversation;