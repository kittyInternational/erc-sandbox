import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LoginC2A from 'components/LoginC2A'
import Welcome from 'components/Welcome'
import * as Styled from 'style'

const AppView = ({ handleSignIn, handleSignOut, loggedIn }) => {
    return (
        <Router>
            <ScrollToTop />
            <LoginC2A {...{ handleSignIn, handleSignOut, loggedIn }} />
            <Styled.Main>
                <Routes>
                    <Route path={'/'} element={<Welcome {...{ loggedIn, handleSignIn }} />} />
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