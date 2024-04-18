import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  Circle, Clear, Brightness5, DarkMode
} from '@mui/icons-material'
import {
  IconButton, Button
} from '@mui/material'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { changeMode, changeMainColor } from 'redux/settingSlice'
import styles from './settingView.module.sass'

function SettingView(props) {
  const { onClose } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { mode, mainColor } = useSelector(state => state.setting)

  const mainColorList = useMemo(() => [{
    color: 'black',
    name: 'Black',
  }, {
    color: 'blue',
    name: 'Blue',
  }, {
    color: 'green',
    name: 'Green',
  }, {
    color: 'purple',
    name: 'Purple',
  }], [])

  const modesList = useMemo(() => [{
    icon: <Brightness5 />,
    name: 'Light',
  }, {
    icon: <DarkMode />,
    name: 'Dark',
  }], [])

  const changeSetting = useCallback((val, fn) => {
    dispatch(fn(val))
  }, [dispatch])

  const button = useCallback((btn, fn, color) => (
    <Button
      key={btn.name}
      className={clsx(styles.btn, (mainColor === btn.name) && styles.border)}
      size="small"
      variant={(color === btn.name) ? 'contained' : 'outlined'}
      startIcon={(btn.icon) ? btn.icon : <Circle />}
      color={(btn?.color) ? btn?.color : 'primary'}
      onClick={() => changeSetting(btn.name, fn)}
    >
      {btn.name}
    </Button>
  ), [changeSetting, mainColor])

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>{t('Settings')}</p>
        <IconButton
          onClick={onClose}
          className={styles.iconBtn}
        >
          <Clear />
        </IconButton>
      </div>
      <div className={styles.setting}>
        <p className={styles.subTitle}>{t('Primary Color')}</p>
        {mainColorList.map(cur => (
          button(cur, changeMainColor, mainColor)
        ))}
      </div>
      <div className={styles.setting}>
        <p className={styles.subTitle}>{t('Color Scheme')}</p>
        {modesList.map(cur => (
          button(cur, changeMode, mode)
        ))}
      </div>
    </div>
  )
}

SettingView.propTypes = {
  onClose: PropTypes.func,
}

SettingView.defaultProps = {
  onClose: () => {},
}

export default SettingView
