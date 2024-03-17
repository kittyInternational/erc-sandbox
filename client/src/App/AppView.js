import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import Chatroom from 'components/Chatroom'
import LoginC2A from 'components/LoginC2A'
import Welcome from 'components/Welcome'
import * as Styled from 'style'

const AppView = ({ handleSignIn, handleSignOut, loggedIn }) => {
    const { REACT_APP_END_POINT } = process.env
    const [socket, setSocket] = useState(false)
    const [block, setBlock] = useState(undefined)

    useEffect(() => {
        if (!socket) {
            const _socket = io(REACT_APP_END_POINT, { transports: ['websocket'] });
            const eventHandlers = {
                connect: () => {
                    setSocket(_socket)
                },
                connect_error: (err) => {
                    console.log(`connect_error due to ${err}`)
                },
                disconnect: () => {
                    setSocket(null)
                },
                ethHeader: (block) => {
                    setBlock(Number(block))
                },
            }
            Object.keys(eventHandlers).forEach((eventName) => {
                _socket.on(eventName, eventHandlers[eventName])
            })
        }
    }, [socket])

    return (
        <Router>
            <ScrollToTop />
            <LoginC2A {...{ handleSignIn, handleSignOut, loggedIn }} />
            <Styled.Main>
                {socket && <Chatroom account={loggedIn} {...{ socket }} />}
                <Routes>
                    <Route path={'/'} element={<Welcome {...{ loggedIn, handleSignIn, block }} />} />
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