import mongoose from 'mongoose'

const createModel = (prefix) => {
    const Schema = new mongoose.Schema({
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
        tokenURI: String,
        signature: String,
        data: String,
        topics: [String],
    })

    Schema.index({ tokenId: 1 }, { "unique": true })
    const modelName = prefix ? `${prefix}_nft` : 'nft'
    return mongoose.model(modelName, Schema)
}

export default createModel
