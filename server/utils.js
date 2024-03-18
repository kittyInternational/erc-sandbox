export const getContractHistory = async (name, Module, eventIncludes, web3) => {
    const { Contracts, Models, deployed, increment, logEvent } = Module
    Object.keys(Contracts).map(async contractName => {
        const events = await getPastContractEvents(`${name} ${contractName}`, Contracts[contractName].abi, Contracts[contractName].addr, deployed, increment, Models, logEvent, eventIncludes, web3)
        console.log(`${events}`)
        subscribeToContractEvents(name, Contracts.Core.abi, Contracts.Core.addr, logEvent, eventIncludes, web3)
    })
}

const getContractEvents = async (abi, addr, web3) => {
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

const subscribeToContractEvents = async (name, abi, addr, logEvent, eventIncludes, web3) => {
    let events = await getContractEvents(abi, addr, web3)
    for (const eventName in events) {
        const event = events[eventName]
        event.on('data', async (event) => {
            if (event.type === 'mined' && eventIncludes.includes(event.event)) {
                console.log(`Retrieved ${name} ${event.event} event`)
                await logEvent(event, web3, true)
            }
        })
    }
}

const getPastEvents = async (abi, address, fromBlock, toBlock, eventIncludes, web3) => {
    const events = await getContractEvents(abi, address, web3)
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

const getPastContractEvents = async (name, abi, addr, fromBlock, increment, Models, logEvent, eventIncludes, web3) => {
    const { Event } = Models
    let latestEvent = await Event.findOne({}, {}, { sort: { 'blockNumber': -1 } })
    let fromBlockNumber = latestEvent ? latestEvent.blockNumber + 1 : fromBlock
    let toBlockNumber = fromBlockNumber + increment - 1

    while (fromBlockNumber <= await web3.eth.getBlockNumber()) {
        let pastEvents = await getPastEvents(abi, addr, fromBlockNumber, toBlockNumber, eventIncludes, web3)
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
        console.log(`Retrieved ${pastEvents.length} ${name} events from block ${fromBlockNumber} - ${toBlockNumber}: ${perc}%`)
        fromBlockNumber = toBlockNumber + 1
        toBlockNumber += increment
        await new Promise(resolve => setTimeout(resolve, 500)) // Don't spam the socket...
    }
    return `${name} events up to date`
}

export const handleStandardERC721Event = async (event, Models, web3) => {
    const _event = {
        logIndex: Number(event.logIndex),
        transactionIndex: Number(event.transactionIndex),
        transactionHash: event.transactionHash,
        blockHash: event.blockHash,
        blockNumber: Number(event.blockNumber),
        address: event.address,
        id: event.id,
        signature: event.signature,
        data: event.raw && event.raw.data ? event.raw.data : event.data,
        topics: event.raw && event.raw.topics ? event.raw.topics : event.topics,
    }

    if (event.returnValues.tokenId !== undefined && event.returnValues.tokenId !== null) { _event.tokenId = Number(event.returnValues.tokenId) }
    if (event.returnValues.from) { _event.from = event.returnValues.from.toLowerCase() }
    if (event.returnValues.to) { _event.to = event.returnValues.to.toLowerCase() }
    if (event.returnValues.owner) { _event.owner = event.returnValues.owner }
    if (event.returnValues.operator) { _event.owner = event.returnValues.operator }
    if (event.returnValues.approved) { _event.approved = event.returnValues.approved }
    const { timestamp } = await web3.eth.getBlock(_event.blockNumber);
    _event.timestamp = Number(timestamp);
    if (event.event === "Transfer") {
        if (_event.from === '0x0000000000000000000000000000000000000000') {
            _event.owner = _event.to
            _event.owners = [_event.to];
            await new Models.NFT(_event).save();
            const record = await Models.Owner.findOneAndUpdate(
                { owner: _event.to },
                { $inc: { balance: 1 } },
                { upsert: true }
            ).exec();
        } else {
            if (_event.from !== '0x0000000000000000000000000000000000000000') {
                try {
                    const record = await Models.NFT.findOneAndUpdate(
                        { tokenId: _event.tokenId },
                        { owner: _event.to, $addToSet: { owners: _event.to } },
                        { upsert: false }
                    ).exec()
                    const record2 = await Models.Owner.findOneAndUpdate(
                        { owner: _event.from },
                        { $inc: { balance: -1 } },
                        { upsert: false }
                    ).exec()
                    const record3 = await Models.Owner.findOneAndUpdate(
                        { owner: _event.to },
                        { $inc: { balance: 1 } },
                        { upsert: true }
                    ).exec()
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
    _event.event = event.event
    const _Event = new Models.Event(_event)
    const record = await _Event.save()
}