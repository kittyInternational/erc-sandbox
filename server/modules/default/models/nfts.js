import mongoose from 'mongoose'

const NftSchema = new mongoose.Schema({
  tokenId: Number,
  timestamp: Number,
  blockNumber: Number,
  logIndex: Number,
  transactionIndex: Number,
  transactionHash: String,
  blockHash: String,
  address: String,
  id: String,
  owner: String,
  owners: [String],
  signature: String,
  data: String,
  topics: [String],
})

NftSchema.index({ tokenId: 1 }, { "unique": true })

const Nft = mongoose.model('nft', NftSchema)
export default Nft
