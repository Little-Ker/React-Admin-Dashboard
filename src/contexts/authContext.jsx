import React, {
  useMemo, useState, createContext, useCallback
} from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext({
  isLoggedIn: false,
  logFalseTip: '',
  onLogout: () => {},
  onLogin: (account, password) => {},
})

export function AuthContextProvider(props) {
  const { children } = props

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [logFalseTip, setLogFalseTip] = useState('')

  const logoutHandler = useCallback(() => {
    // setIsLoggedIn(false)
  }, [])

  const loginHandler = useCallback((account, password) => {
    setLogFalseTip('')
    if (account === 'abc' && password === '123') {
      setIsLoggedIn(true)
      return
    }
    setLogFalseTip('帳號或密碼有誤')
    throw new Error('Please check your email and password')
  }, [])

  const contextValue = useMemo(() => ({
    isLoggedIn,
    logFalseTip,
    onLogout: logoutHandler,
    onLogin: loginHandler,
  }), [isLoggedIn, loginHandler, logoutHandler, logFalseTip])

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthContext
