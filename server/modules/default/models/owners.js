import mongoose from 'mongoose'

const OwnerSchema = new mongoose.Schema({
  owner: String,
  balance: Number,
})

OwnerSchema.index({ owner: 1 }, { "unique": true })

const Owner = mongoose.model('owner', OwnerSchema)
export default Owner