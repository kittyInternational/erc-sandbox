import Models from './models'
import Routes from './routes'
import Contracts from './contracts'
import Socket from './socket'

const increment = 2500 // how many blocks per query when looking for past events
const Deployed = 0

const logEvent = async (event, web3) => {
    console.log(event)
}

export default { Models, Routes, Contracts, Socket, Deployed, increment, logEvent }