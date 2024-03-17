import { useEffect, useState } from 'react'
import { formatDate } from './utils'
import * as Styled from './Messages.style'

const Messages = ({ socket }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.emit('getMessages')
    socket.on('messages', data => {
      setMessages([...data].reverse())
    })
  }, [])

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
