import { useEffect, useState } from 'react'

const Blockheight = ({ socket }) => {
    const [block, setBlock] = useState([])

    useEffect(() => {
        const eventHandlers = {
            ethHeader: (block) => setBlock(Number(block))
        }
        if (socket) {
            Object.keys(eventHandlers).forEach((eventName) => socket.on(eventName, eventHandlers[eventName]))
            return () => {
                Object.keys(eventHandlers).forEach((eventName) => socket.off(eventName, eventHandlers[eventName]))
            }
        }
    }, [socket])

    return (
        <p>Block height: {block ? <a href={`https://etherscan.io/block/${block}`} target={'_blank'} rel="noreferrer">{block}</a> : '...'}</p>
    )
}

export default Blockheight