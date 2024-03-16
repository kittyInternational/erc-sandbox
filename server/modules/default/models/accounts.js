import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
  },
  avatar: {
    type: Number,
    default: -1,
  }
})

AccountSchema.set('timestamps', true)
AccountSchema.index({ "address": 1 }, { "unique": true })
const Account = mongoose.model('account', AccountSchema)

export default Account