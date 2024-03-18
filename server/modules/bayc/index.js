import Models from './models'
import Routes from './routes'
import Contracts from './contracts'

const increment = 250 // how many blocks per query when looking for past events
const Deployed = 12287507

const { Event, NFT, Owner } = Models

const logEvent = async (event, web3) => {
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
            await new NFT(_event).save();
            const record = await Owner.findOneAndUpdate(
                { owner: _event.to },
                { $inc: { balance: 1 } },
                { upsert: true }
            ).exec();
        } else {
            if (_event.from !== '0x0000000000000000000000000000000000000000') {
                try {
                    const record = await NFT.findOneAndUpdate(
                        { tokenId: _event.tokenId },
                        { owner: _event.to, $addToSet: { owners: _event.to } },
                        { upsert: false }
                    ).exec()
                    const record2 = await Owner.findOneAndUpdate(
                        { owner: _event.from },
                        { $inc: { balance: -1 } },
                        { upsert: false }
                    ).exec()
                    const record3 = await Owner.findOneAndUpdate(
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
    const _Event = new Event(_event)
    const record = await _Event.save()
}

export default { Models, Routes, Contracts, Deployed, increment, logEvent }