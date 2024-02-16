import React, {
  useCallback, useState, useEffect
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  Popover, IconButton, MenuItem, Box
} from '@mui/material'
import tw from 'assets/lang/ic_flag_ch.png'
import en from 'assets/lang/ic_flag_en.png'
import {
  changeLang
} from 'redux/settingSlice'
import { useDispatch } from 'react-redux'
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
  const { i18n } = useTranslation()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(null)
  const [lang, setLang] = useState(LANGS[0])

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(null)
  }, [])

  const onChangeLang = useCallback((val) => {
    const findLang = LANGS.find(item => (item.value === val?.value))
    const langValue = (findLang) ? findLang.value : 'en'

    setLang((findLang) || LANGS[0])
    dispatch(changeLang(langValue))
    i18n.changeLanguage(langValue)
    window.history.replaceState({}, '', `${window.location.pathname}?${langValue}`)
  }, [dispatch, i18n])

  const handleClickLang = useCallback((val) => {
    onChangeLang(val)
    setOpen(null)
  }, [onChangeLang])

  useEffect(() => {
    if (window.location.search !== '') return
    const languageDetector = (navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage) || 'en'
    onChangeLang(languageDetector)
  }, [dispatch, i18n, onChangeLang])

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.leftContent}>
          <div className={styles.logo}>{'VIVI'}</div>
        </div>
        <div className={styles.rightContent}>
          <IconButton
            onClick={handleOpen}
            className={styles.iconBtn}
          >
            <img src={lang?.icon} alt={lang?.label} className={styles.iconImg} />
          </IconButton>
          <Popover
            open={!!open}
            anchorEl={open}
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
        </div>
      </div>
    </div>
  )
}

export default Header
