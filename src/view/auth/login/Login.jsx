/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useContext, useCallback, useState
} from 'react'
import {
  useNavigate
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Visibility, VisibilityOff, Google, Facebook, Lock, Person
} from '@mui/icons-material'
import AuthContext from 'contexts/authContext'
import clsx from 'clsx'
import {
  useSelector
} from 'react-redux'
import styles from './login.module.sass'

function Login() {
  const { t } = useTranslation()
  const lang = useSelector(state => state.setting.lang)

  const navigate = useNavigate()
  const ctx = useContext(AuthContext)

  const [showPassword, setShowPassword] = useState(false)

  const [account, setAccount] = useState('abc')
  const [password, setPassword] = useState('123')

  const onSubmit = useCallback(async () => {
    await ctx?.onLogin(account, password)
    navigate(`/dashboard?${lang}`)
  }, [ctx, account, password, navigate, lang])

  const onEnterRegisterView = useCallback(async () => {
    await ctx?.onResetTip()
    navigate(`/register?${lang}`)
  }, [ctx, navigate, lang])

  return (
    <div className={styles.root}>
      <form noValidate className={styles.form}>
        <p className={styles.title}>{t('Sign In')}</p>
        <div className={styles.inputBorder}>
          <div className={styles.icon}>
            <Person />
          </div>
          <input
            type="text"
            placeholder={t('Account')}
            value={account}
            onChange={(e) => { setAccount(e.target.value) }}
            autoComplete="username"
          />
        </div>
        <div className={styles.inputBorder}>
          <div className={styles.icon}>
            <Lock />
          </div>
          <input
            value={password}
            placeholder={t('Password')}
            onChange={(e) => { setPassword(e.target.value) }}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
          />
          <div className={styles.icon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>
        {(ctx?.logFalseTip !== '') && (<p className={styles.tip}>{ctx?.logFalseTip}</p>)}
        <button type="button" className={styles.loginBtn} onClick={onSubmit}>{t('Login')}</button>
        <p className={styles.text}>{'or'}</p>
        <button type="button" className={clsx(styles.loginBtn, styles.googleBtn)} onClick={onSubmit}>
          <Google sx={{ marginRight: '.5rem' }} />
          <p>{t('Sign in with Google')}</p>
        </button>
        <button type="button" className={clsx(styles.loginBtn, styles.facebookBtn)} onClick={onSubmit}>
          <Facebook sx={{ marginRight: '.5rem' }} />
          <p>{t('Sign in with Facebook')}</p>
        </button>
        <div className={styles.registerContent}>
          <p>{t('Don\'t have an account?')}</p>
          <div className={styles.register} onClick={onEnterRegisterView}>{t('Create account')}</div>
        </div>
      </form>
      <svg
        className={styles.waves}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="parallax">
          <use className={styles.wave1} xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use className={styles.wave2} xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use className={styles.wave3} xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use className={styles.wave4} xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
  )
}

export default Login
