import { useEffect, useState } from 'react'
import { formatDate } from 'utils'
import * as Styled from './Messages.style'

const Messages = ({ socket }) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const eventHandlers = {
            messages: data => setMessages([...data].reverse())
        }
        if (socket) {
            Object.keys(eventHandlers).forEach((eventName) => socket.on(eventName, eventHandlers[eventName]))
            return () => {
                Object.keys(eventHandlers).forEach((eventName) => socket.off(eventName, eventHandlers[eventName]))
            }
        }
    }, [socket])

    return (
        <Styled.Div>
            {messages.map(({ account, createdAt, message }, i) => {
                return (
                    <div key={i}>
                        <div>
                            <div><span>{account}</span></div>
                            <div>{message}</div>
                            <div>{formatDate(createdAt)}</div>
                        </div>
                    </div>
                )
            })}
        </Styled.Div>
    )
}

export default Messages
