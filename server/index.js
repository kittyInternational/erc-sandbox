import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server as socketIo } from 'socket.io'
import bodyParser from 'body-parser'
import cors from 'cors'
import Web3 from 'web3'
import { db, socketConfig } from './config'

const { NODE_ENV, ORIGIN, PORT, WEB3_SOCKET_URL } = process.env

const App = async () => {
    // Web3 Connection:
    const web3 = new Web3(new Web3.providers.WebsocketProvider(WEB3_SOCKET_URL, socketConfig))
    web3.currentProvider.on('error', (error) => console.error('WebSocket Connection Error:', error))
    web3.currentProvider.on('connect', () => console.log('WebSocket Connection Established'))

    // expess app with socket.io and mongodb connection
    const app = express()
    const server = createServer(app)
    app.use(express.json())
    app.use(cors())
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    const io = new socketIo(server, { cors: { origin: [ORIGIN] } })
    db.on("error", err => console.log("There was a problem connecting to mongo: ", err))
    db.once("open", () => runApp())

    // start an awesome web3 app...
    const runApp = () => console.log('start an awesome web3 app...')

    // serves prod build of front end:
    if (NODE_ENV === 'PRODUCTION') {
        const staticFolderPath = path.join(__dirname, 'build')
        app.use(express.static(staticFolderPath))
        app.get('/', (req, res) => res.sendFile(path.join(staticFolderPath, 'index.html')))
    }

    server.listen(PORT, () => console.log(`listening on *:${PORT}`))
}

App()

