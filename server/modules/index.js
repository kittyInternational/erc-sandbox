import defaultModule from './default'
import chainedHorseModule from './chained-horse'
import twoBitBearModule from './two-bit-bears'

const modules = (app, io, web3) => {
    const name = undefined // adds a name to the server project endpoint so should be lowercase and hypenated if need be e.g. 'cryptokitties'
    const prefix = undefined // adds a prefix to db tables - e.g. 'ck'
    const deployed = 0 // block the contract you wish to observer was deployed e.g. 4605167
    const eventsToWatch = ["Transfer"] /* events you wish to monitor - add more as required e.g. "Approval", "ApprovalForAll" */
    const increment = 100 // adjust this as required - max is 10000
    defaultModule(app, io, web3, { name, prefix, deployed, increment, eventsToWatch })

    // Add some horses...
    chainedHorseModule(app, io, web3, { 
        name: 'chained-horse',
        prefix: 'ch',
        deployed: 13504887,
        increment: 10000,
        eventsToWatch: ['Transfer']
    })

    // Add some bears...
    twoBitBearModule(app, io, web3, {
        name: 'two-bit-bears',
        prefix: 'tbb',
        deployed: 13385399,
        increment: 1000,
        eventsToWatch: ['Transfer']
    })
    
}

export default modules
