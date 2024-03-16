import React, { useCallback, useState, useEffect } from 'react'
import Web3 from 'web3'
import axios from 'axios'
import Cookies from 'js-cookie'
import AppView from './AppView'

const { REACT_APP_END_POINT, REACT_APP_CHAIN_ID, REACT_APP_TOKEN_NAME } = process.env

function App() {
  const [loggedIn, setLoggedIn] = useState(undefined)
  const [token, setToken] = useState(Cookies.get(REACT_APP_TOKEN_NAME) || undefined)

  const handleLogout = useCallback(() => {
    Cookies.remove(REACT_APP_TOKEN_NAME)
    setLoggedIn(undefined)
    setToken(undefined)
  }, [setLoggedIn, setToken])

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0 && loggedIn) {
        handleLogout()
      }
    }

    const handleDisconnect = (error) => {
      console.error('Metamask error:', error)
      handleLogout()
    }

    const handleReload = () => window.location.reload()

    if (token && loggedIn && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('disconnect', handleDisconnect)
      window.ethereum.on('chainChanged', handleReload)

      return () => {
        window.ethereum.off('accountsChanged', handleAccountsChanged)
        window.ethereum.off('disconnect', handleDisconnect)
        window.ethereum.off('chainChanged', handleReload)
      }
    }
  }, [token, loggedIn, handleLogout])

  const handleSignIn = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      if (chainId === REACT_APP_CHAIN_ID) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          const web3 = new Web3(window.ethereum)
          const message = 'Sign this message to authenticate'
          const accounts = await web3.eth.getAccounts()
          const signature = await web3.eth.personal.sign(message, accounts[0], '')
          const response = await axios.post(`${REACT_APP_END_POINT}/auth`, { address: accounts[0], signature, message })
          Cookies.set(REACT_APP_TOKEN_NAME, response.data.token)
          setLoggedIn(accounts[0])
        } catch (error) {
          console.error('Error:', error)
        }
      } else {
        alert('you are on the wrong chain!')
      }
    }
  }

  const handleSignOut = async () => {
    if (token) {
      try {
        await axios.post(`${REACT_APP_END_POINT}/auth/logout`, { token })
      } catch (error) {
        console.error('Logout error:', error)
      }
      handleLogout()
    }
  }

  const checkToken = useCallback(async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      if (chainId === REACT_APP_CHAIN_ID) {
        const { data } = await axios.post(`${REACT_APP_END_POINT}/auth/check-token`, { token })
        if (data.valid) {
          setLoggedIn(data.address.toLowerCase())
        } else {
          handleLogout()
        }
      }
    } catch (error) {
      handleLogout()
    }
  }, [token, setLoggedIn, handleLogout])

  useEffect(() => {
    if (token && window.ethereum) {
      checkToken()
    }
  }, [token, checkToken])

  return <AppView {...{ handleSignIn, handleSignOut, loggedIn }} />
}

export default App
