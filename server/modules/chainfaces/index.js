import _Models from './models'
import Routes from './routes'
import Contracts from './contracts'
import Socket from './socket'
import { getContractHistory, handleStandardERC721Event } from '../../utils'

const processEvent = async (event, web3) => {
    const contract = new web3.eth.Contract(Contracts.Core.abi, Contracts.Core.addr)
    event.face = await contract.methods.getFace(event.tokenId).call().catch(e => console.log(e))
    const backgroundColor = await contract.methods.getBackgroundColor(event.tokenId).call().catch(e => console.log(e))
    event.backgroundColor = Number(backgroundColor)
    const faceSymmetry = await contract.methods.getFaceSymmetry(event.tokenId).call().catch(e => console.log(e))
    event.faceSymmetry = Number(faceSymmetry)
    const golfScore = await contract.methods.getGolfScore(event.tokenId).call().catch(e => console.log(e))
    event.golfScore = Number(golfScore)
    const percentBear = await contract.methods.getPercentBear(event.tokenId).call().catch(e => console.log(e))
    event.percentBear = Number(percentBear)
    const textColor = await contract.methods.getTextColor(event.tokenId).call().catch(e => console.log(e))
    event.textColor = Number(textColor)
    console.log(event.face, event.backgroundColor, event.faceSymmetry, event.golfScore, event.percentBear, event.textColor)
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
            Socket(io, web3, name ? name : '', Models)
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