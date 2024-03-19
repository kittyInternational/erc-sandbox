import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import Chainface from 'components/Chainface'
import Chatroom from 'components/Chatroom'
import LoginC2A from 'components/LoginC2A'
import Nfts from 'components/Nfts'
import Profile from 'components/Profile'
import Wtf from 'components/Wtf'
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
                    <Route path={'/'} element={<Nfts />} />
                    <Route path={'/chainface/:id'} element={<Chainface />} />
                    <Route path={'/profile/:_profile'} element={<Profile {...{ loggedIn }} />} />
                    <Route path={'/wtf'} element={<Wtf />} />
                </Routes>
            </Styled.Main>
        </Router>
    )
}



const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
    const isHomepage = pathname === '/'
    const isWtf = pathname === '/wtf'
    return (
        <>
            {!isHomepage && <Styled.C2A to={'/'} className={'left'} />}
            {!isWtf && <Styled.C2A to={'/wtf'} className={'right'}>wtf</Styled.C2A>}
        </>
    )
}

export default AppView