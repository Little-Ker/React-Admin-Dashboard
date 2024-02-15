/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useContext, useCallback, useState, useMemo
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
import styles from './register.module.sass'

function Register() {
  const { t } = useTranslation()
  const lang = useSelector(state => state.setting.lang)
  const navigate = useNavigate()
  const ctx = useContext(AuthContext)

  const [showPassword, setShowPassword] = useState([false, false])

  const [account, setAccount] = useState('abc')
  const [password, setPassword] = useState('123')
  const [reEnterPassword, setReEnterPassword] = useState('123')

  const onRegister = useCallback(async () => {
    await ctx?.onRegister(account, password, reEnterPassword)
    await ctx?.onResetTip()
    navigate(`/login?${lang}`)
  }, [ctx, account, password, navigate, reEnterPassword, lang])

  const onEnterLogView = useCallback(async () => {
    await ctx?.onResetTip()
    navigate(`/login?${lang}`)
  }, [navigate, lang, ctx])

  const onCloseEyes = useCallback((index) => {
    setShowPassword((prev) => {
      const showAry = [...prev]
      showAry[index] = !prev[index]
      return showAry
    })
  }, [])

  const passwordList = useMemo(() => [{
    value: password,
    setFn: e => setPassword(e.target.value),
    placeholder: t('Password'),
  }, {
    value: reEnterPassword,
    setFn: e => setReEnterPassword(e.target.value),
    placeholder: t('ReEnter Password'),
  }], [password, reEnterPassword, t])

  return (
    <div className={styles.root}>
      <form noValidate className={styles.form}>
        <p className={styles.title}>{t('Create account')}</p>
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
        {passwordList.map((cur, index) => (
          <div key={`${index.toString()}`} className={styles.inputBorder}>
            <div className={styles.icon}>
              <Lock />
            </div>
            <input
              value={cur.value}
              placeholder={cur.placeholder}
              onChange={cur.setFn}
              type={showPassword[index] ? 'text' : 'password'}
              autoComplete="new-password"
            />
            <div className={styles.icon} onClick={() => onCloseEyes(index)}>
              {showPassword[index] ? <Visibility /> : <VisibilityOff />}
            </div>
          </div>
        ))}
        {(ctx?.logFalseTip !== '') && (<p className={styles.tip}>{ctx?.logFalseTip}</p>)}
        <button type="button" className={styles.loginBtn} onClick={onRegister}>{t('Register')}</button>
        <p className={styles.text}>{'or'}</p>
        <button type="button" className={clsx(styles.loginBtn, styles.googleBtn)} onClick={onRegister}>
          <Google sx={{ marginRight: '.5rem' }} />
          <p>{t('Sign in with Google')}</p>
        </button>
        <button type="button" className={clsx(styles.loginBtn, styles.facebookBtn)} onClick={onRegister}>
          <Facebook sx={{ marginRight: '.5rem' }} />
          <p>{t('Sign in with Facebook')}</p>
        </button>
        <div className={styles.registerContent}>
          <p>{t('Already have an account?')}</p>
          <div className={styles.register} onClick={onEnterLogView}>{t('Sign In')}</div>
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

export default Register
