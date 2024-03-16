import { useEffect } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import LoginC2A from 'components/LoginC2A'

const AppView = ({ handleSignIn, handleSignOut, loggedIn }) => {
    return (
        <Router>
            <ScrollToTop />
            <LoginC2A {...{ handleSignIn, handleSignOut, loggedIn }} />
        </Router>
    )
}

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' })}, [pathname])
  return null
}

export default AppView