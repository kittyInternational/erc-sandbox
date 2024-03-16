import mongoose from 'mongoose'

const { MONGO_URL } = process.env

export const socketConfig = {
    clientConfig: {
        maxReceivedFrameSize: 100000000,
        maxReceivedMessageSize: 100000000,
    },
    reconnect: {
        auto: true,
        delay: 5000, // Adjust the delay as needed
        maxAttempts: Infinity, // Retry indefinitely or set a specific number of attempts
        onTimeout: false,
    }
}

mongoose.set('strictQuery', true)
const mongoUri = MONGO_URL
const conn = async () => await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
conn()

export const db = mongoose.connection