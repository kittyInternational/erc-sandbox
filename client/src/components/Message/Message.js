import { useState } from 'react'
import * as Styled from './Message.style'

const Message = ({ account, socket }) => {
  const [message, setMessage] = useState('')

  return (
    <Styled.Div>
      <input type={'text'} disabled={!account} value={message} onChange={e => {
        if (e.target.value.length <= 140) {
          setMessage(e.target.value)
        }
      }} />
      <button disabled={message === '' || !account} onClick={() => {
        socket.emit('addMessage', { account, message })
        setMessage('')
      }}>{'Send'}</button>
    </Styled.Div>
  )
}

export default Message
