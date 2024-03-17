import Message from 'components/Message'
import Messages from 'components/Messages'
import * as Styled from './Chatroom.style'
import { useState } from 'react'

const Chatroom = ({ account, socket }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(prevVisible => !prevVisible)
    }
    return (
        <>
            <Styled.C2A onClick={toggleVisibility} role={'button'} />
            <Styled.Div visible={visible.toString()}>
                <Message {...{ account, socket }} />
                <Messages {...{ socket }} />
            </Styled.Div>
        </>
        
    )
}

export default Chatroom