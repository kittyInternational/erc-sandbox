import defaultModule from './default'

const modules = (app, io, web3) => {
    const name = 'slime' // adds a name to the server project endpoint so should be lowercase and hypenated if need be e.g. 'cryptokitties'
    const prefix = 'slm' // adds a prefix to db tables - e.g. 'ck'
    const deployed = 16098911 // block the contract you wish to observer was deployed e.g. 4605167
    const eventsToWatch = ["Transfer"] /* events you wish to monitor - add more as required e.g. "Approval", "ApprovalForAll" */
    const increment = 1000 // adjust this as required - max is 10000
    defaultModule(app, io, web3, { name, prefix, deployed, increment, eventsToWatch })
}

export default modules
