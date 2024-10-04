import defaultModule from './default'
import eggModule from './egg'

const modules = (app, io, web3) => {
    const name = undefined // adds a name to the server project endpoint so should be lowercase and hypenated if need be e.g. 'cryptokitties'
    const prefix = undefined // adds a prefix to db tables - e.g. 'ck'
    const deployed = 0 // block the contract you wish to observer was deployed e.g. 4605167
    const eventsToWatch = ["Transfer"] /* events you wish to monitor - add more as required e.g. "Approval", "ApprovalForAll" */
    const increment = 100 // adjust this as required - max is 10000
    // defaultModule(app, io, web3, { name, prefix, deployed, increment, eventsToWatch })
    eggModule(app, io, web3, { name: 'egg', prefix: 'egg', deployed: 20644759, increment: 100, eventsToWatch: ['Transfer'] })
}

export default modules
