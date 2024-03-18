export const getContractHistory = async (name, web3, Module, eventIncludes) => {
    const { Contracts, Deployed, increment, Models, logEvent } = Module
    Object.keys(Contracts).map(async contractName => {
        const events = await getPastContractEvents(`${name} ${contractName}`, web3, Contracts[contractName].abi, Contracts[contractName].addr, Deployed, increment, Models, logEvent, eventIncludes)
        console.log(`${events}`)
        subscribeToContractEvents(name, web3, Contracts.Core.abi, Contracts.Core.addr, logEvent, eventIncludes)
    })
}
    
const getContractEvents = async (web3, abi, addr) => {
    const events = {}
    const contractInstance = new web3.eth.Contract(abi, addr)

    await abi.forEach((item) => {
        if (item.type !== 'event') {
            return
        }
        events[item.name] = contractInstance.events[item.name]()
    })
    return events
}

const subscribeToContractEvents = async (name, web3, abi, addr, logEvent, eventIncludes) => {
    let events = await getContractEvents(web3, abi, addr)
    for (const eventName in events) {
        const event = events[eventName]
        event.on('data', async (event) => {
            if (/* event.type === 'mined' && */eventIncludes.includes(event.event)) {
                console.log(`Retrieved ${name} ${event.event} event`)
                await logEvent(event, web3, true)
            }
        })
    }
}

const getPastEvents = async (web3, abi, address, fromBlock, toBlock, eventIncludes) => {
    const events = await getContractEvents(web3, abi, address)
    const pastEvents = []
    for (const eventName in events) {
        const contract = new web3.eth.Contract(abi, address)
        if (eventIncludes.includes(eventName)) {
            const _events = await contract.getPastEvents(eventName, {
                fromBlock, toBlock, address,
            })
            _events.forEach(event => {
                const eventObject = Object.assign({}, event, { event: eventName })
                pastEvents.push(eventObject)
            })
        }
    }
    return pastEvents
}

const getPastContractEvents = async (name, web3, abi, addr, fromBlock, increment, Models, logEvent, eventIncludes) => {
    const { Event } = Models
    let latestEvent = await Event.findOne({}, {}, { sort: { 'blockNumber': -1 } })
    let fromBlockNumber = latestEvent ? latestEvent.blockNumber + 1 : fromBlock
    let toBlockNumber = fromBlockNumber + increment - 1

    while (fromBlockNumber <= await web3.eth.getBlockNumber()) {
        let pastEvents = await getPastEvents(web3, abi, addr, fromBlockNumber, toBlockNumber, eventIncludes)
        pastEvents.sort((a, b) => {
            const aBlockNumber = a.blockNumber
            const bBlockNumber = b.blockNumber

            const blockComparison = aBlockNumber - bBlockNumber
            if (blockComparison === 0n) {
                const aLogIndex = a.logIndex
                const bLogIndex = b.logIndex
                const logIndexComparison = aLogIndex - bLogIndex
                return logIndexComparison > 0n ? 1 : (logIndexComparison < 0n ? -1 : 0)
            }
            return blockComparison > 0n ? 1 : -1
        })
        for (let event of pastEvents) {
            try {
                await logEvent(event, web3)
            } catch (error) {
                console.error(`Error processing event ${event}: ${error}`, event)
            }
        }
        const currentBlockNumber = await web3.eth.getBlockNumber()
        const perc = ((100 / (Number(currentBlockNumber) - fromBlock)) * (toBlockNumber - fromBlock)).toFixed(2)
        console.log(`Retrieved ${pastEvents.length} ${name} events from block: ${perc}%`)
        fromBlockNumber = toBlockNumber + 1
        toBlockNumber += increment
        await new Promise(resolve => setTimeout(resolve, 500)) // Don't spam the socket...
    }
    return `events up to date`
}