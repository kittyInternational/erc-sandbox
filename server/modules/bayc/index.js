import _Models from './models'
import Routes from './routes'
import Contracts from './contracts'
import { getContractHistory, handleStandardERC721Event } from '../../utils'

const processEvent = async (event, web3) => {
    const contract = new web3.eth.Contract(Contracts.Core.abi, Contracts.Core.addr)
    const tokenUri = await contract.methods.tokenURI(event.tokenId).call().catch(e => console.log(e))
    event.tokenUri = tokenUri
    await new Promise(resolve => setTimeout(resolve, 500))
    return event
}

const logEvent = async (event, Models, web3) => handleStandardERC721Event(event, processEvent, Models, web3)

const runModule = (app, io, web3, config) => {
    const { name, prefix, deployed, increment, eventsToWatch } = config
    const Models = {}
    Object.keys(_Models).map((m, i) => {
        Models[m] = _Models[m](prefix)
        if (i === Object.keys(_Models).length - 1) {
            Routes(app, name, Models)
        }
    })
    if (Object.keys(Contracts) && Contracts[Object.keys(Contracts)[0]].abi && Contracts[Object.keys(Contracts)[0]].addr) {
        const module = { Contracts, Models, deployed, increment, eventsToWatch, logEvent: event => logEvent(event, Models, web3) }
        getContractHistory(name === undefined ? 'default module' : name, module, eventsToWatch, web3)
    } else {
        console.log('no contract found to observe')
    }
}

export default runModule