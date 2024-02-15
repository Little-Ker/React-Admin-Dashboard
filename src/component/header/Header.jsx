import React, {
  useCallback, useState, useEffect
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  Popover, IconButton, MenuItem, Box
} from '@mui/material'
import ch from 'assets/lang/ic_flag_ch.png'
import en from 'assets/lang/ic_flag_en.png'
import {
  useNavigate
} from 'react-router-dom'
import {
  changeLang
} from 'redux/settingSlice'
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
    icon: ch,
  },
]

function Header() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(null)
  const [lang, setLang] = useState(LANGS[0])

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(null)
  }, [])

  const handleClickLang = useCallback((val) => {
    window.location.search = val?.value
    changeLang(val?.value)
    setOpen(null)
  }, [])

  useEffect(() => {
    if (window.location.search !== '') return
    const languageDetector = (navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage) || 'en'
    const findLang = LANGS.find(item => (item.value === languageDetector))
    window.location.search = (findLang) ? findLang.value : 'en'
  }, [i18n?.language])

  useEffect(() => {
    const params = window.location.search
    i18n.changeLanguage(params.substr(1))
    const findLang = LANGS.find(item => (item.value === i18n.language))
    setLang((findLang) || LANGS[0])
  }, [i18n, lang])

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
