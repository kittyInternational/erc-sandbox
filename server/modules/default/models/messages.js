import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
    account: String,
    message: String
})

MessageSchema.set('timestamps', true)

const Messages = mongoose.model('message', MessageSchema)

export default Messages
