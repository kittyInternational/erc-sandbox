import { useEffect } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import LoginC2A from 'components/LoginC2A'
import * as Styled from 'style'

const AppView = ({ handleSignIn, handleSignOut, loggedIn }) => {
    return (
        <Router>
            <ScrollToTop />
            <LoginC2A {...{ handleSignIn, handleSignOut, loggedIn }} />
            <Styled.Main>
                <h1>ERC SANDBOX</h1>
                {loggedIn ? (
                    <p>You are logged in!</p>
                ): (
                    <p>You are not logged in!</p>
                )}
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