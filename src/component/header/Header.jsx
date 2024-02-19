import React, {
  useCallback, useState, useEffect, useContext
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  Popover, IconButton, MenuItem, Box, Drawer
} from '@mui/material'
import { Settings } from '@mui/icons-material'
import tw from 'assets/lang/ic_flag_ch.png'
import en from 'assets/lang/ic_flag_en.png'
import { changeLang } from 'redux/settingSlice'
import { useSelector, useDispatch } from 'react-redux'
import AuthContext from 'contexts/authContext'
import SettingView from 'view/setting/settingView'
import { createTheme } from 'theme'
import styles from './header.module.sass'

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: en,
  },
  {
    value: 'tw',
    label: '繁體中文',
    icon: tw,
  },
]

function Header() {
  const { mode } = useSelector(state => state.setting)
  const ctx = useContext(AuthContext)
  const { i18n } = useTranslation()
  const dispatch = useDispatch()
  const isAuth = ctx?.isLoggedIn

  const [openLang, setOpenLang] = useState(null)
  const [openSetting, setOpenSetting] = useState(null)
  const [lang, setLang] = useState(LANGS[0])

  const theme = createTheme({ mode })

  const handleOpen = useCallback((event, fn) => {
    fn(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setOpenLang(null)
    setOpenSetting(null)
  }, [])

  const onChangeLang = useCallback((val) => {
    const findLang = LANGS.find(item => (item.value === val))
    const langValue = (findLang) ? findLang.value : 'en'

    localStorage.setItem('lang', langValue)
    setLang((findLang) || LANGS[0])
    dispatch(changeLang(langValue))
    i18n.changeLanguage(langValue)
    window.history.replaceState({}, '', `${window.location.pathname}?${langValue}`)
  }, [dispatch, i18n])

  const handleClickLang = useCallback((val) => {
    onChangeLang(val?.value)
    setOpenLang(null)
  }, [onChangeLang])

  useEffect(() => {
    const languageDetector = (localStorage.getItem('lang') || navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage) || 'en'
    onChangeLang(languageDetector)
  }, [dispatch, i18n, onChangeLang])

  return (
    <div className={styles.root} style={{ width: (isAuth) ? 'calc(100% - 280px)' : '100%' }}>
      <div className={styles.header}>
        <div className={styles.leftContent}>
          {(!isAuth) && (<div className={styles.logo}>{'VIVI'}</div>)}
        </div>
        <div className={styles.rightContent}>
          <IconButton
            onClick={e => handleOpen(e, setOpenLang)}
            className={styles.iconBtn}
          >
            <img src={lang?.icon} alt={lang?.label} className={styles.iconImg} />
          </IconButton>
          <Popover
            open={!!openLang}
            anchorEl={openLang}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { width: 160, my: 1 },
            }}
          >
            {LANGS.map(option => (
              <MenuItem
                key={option.value}
                onClick={() => handleClickLang(option)}
              >
                <Box component="img" alt={option.label} src={option.icon} sx={{ width: 25, mr: 2, my: 1 }} />
                {option.label}
              </MenuItem>
            ))}
          </Popover>
          <IconButton
            onClick={e => handleOpen(e, setOpenSetting)}
            className={styles.iconBtn}
            style={{ color: (isAuth) ? theme?.palette?.text?.primary : '#fff' }}
          >
            <Settings />
          </IconButton>
          <Drawer
            anchor={'right'}
            open={!!openSetting}
            onClose={handleClose}
            BackdropProps={{ invisible: true }}
          >
            <SettingView onClose={handleClose} />
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default Header
