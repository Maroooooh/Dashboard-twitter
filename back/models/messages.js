const mongoose = require('mongoose');

const {Schema}=mongoose
const messageSchema = mongoose.Schema({

    conversationId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
    },
    content: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 2000
        
    },
    senderId:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    recipientId: {
        type : Schema.Types.ObjectId ,
        ref:"User",
        required: true

    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;