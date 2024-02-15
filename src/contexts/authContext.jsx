import React, {
  useMemo, useState, createContext, useCallback
} from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const AuthContext = createContext({
  isLoggedIn: false,
  logFalseTip: '',
  onLogout: () => {},
  onLogin: (account, password) => {},
  onRegister: (account, password) => {},
})

export function AuthContextProvider(props) {
  const { children } = props
  const { t } = useTranslation()

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
    setLogFalseTip(t('Please check your account and password'))
    throw new Error(t('Please check your account and password'))
  }, [t])

  const registerHandler = useCallback((account, password, reEnterPassword) => {
    setLogFalseTip('')
    if (account === '' || password === '') {
      setLogFalseTip(t('Your account and password cannot be empty'))
      throw new Error(t('Please check your account and password'))
    }
    if (password !== reEnterPassword) {
      setLogFalseTip(t('Incorrect re-entered password'))
      throw new Error(t('Please check your account and password'))
    }
    if (account === 'abc') {
      setLogFalseTip(t('This account is already in use'))
      throw new Error(t('Please check your account and password'))
    }

    if (account === 'abc' && password === '123') {
      setIsLoggedIn(true)
    }
  }, [t])

  const resetTipHandler = useCallback(() => {
    setLogFalseTip('')
  }, [])

  const contextValue = useMemo(() => ({
    isLoggedIn,
    logFalseTip,
    onLogout: logoutHandler,
    onLogin: loginHandler,
    onRegister: registerHandler,
    onResetTip: resetTipHandler,
  }), [isLoggedIn, loginHandler, logoutHandler, logFalseTip, registerHandler, resetTipHandler])

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
