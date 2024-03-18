import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import Chatroom from 'components/Chatroom'
import LoginC2A from 'components/LoginC2A'
import Welcome from 'components/Welcome'
import { END_POINT } from 'utils'
import * as Styled from 'style'

const AppView = ({ handleSignIn, handleSignOut, loggedIn }) => {
    const [socket, setSocket] = useState(false)

    useEffect(() => {
        let _socket
        const eventHandlers = {
            connect: () => setSocket(_socket),
            connect_error: (err) => console.log(`connect_error due to ${err}`),
            disconnect: () => setSocket(null),
        }
    
        if (!socket) {
            _socket = io(END_POINT, { transports: ['websocket'] })
            Object.keys(eventHandlers).forEach((eventName) => _socket.on(eventName, eventHandlers[eventName]))
        } else {
            return () => {
                if (_socket) {
                    Object.keys(eventHandlers).forEach((eventName) => _socket.off(eventName, eventHandlers[eventName]))
                    _socket.disconnect()
                }
            }
        }
    }, [socket])

    return (
        <Router>
            <ScrollToTop />
            <LoginC2A {...{ handleSignIn, handleSignOut, loggedIn }} />
            <Styled.Main>
                {socket && <Chatroom account={loggedIn} {...{ socket }} />}
                <Routes>
                    <Route path={'/'} element={<Welcome {...{ loggedIn, handleSignIn, socket }} />} />
                </Routes>
            </Styled.Main>
        </Router>
    )
}

const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
    return null
}

export default AppView