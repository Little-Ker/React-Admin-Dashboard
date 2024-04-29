/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types'
import {
  IconButton, Tooltip
} from '@mui/material'
import styles from './calender.module.sass'

function BaseIconButton(props) {
  const {
    tip, onClickFunc, icon, sx, color, fontSize, disabled,
  } = props

  return (
    <Tooltip title={tip}>
      <IconButton
        onClick={onClickFunc}
        className={styles.iconBtn}
        sx={sx}
        color={color}
        fontSize={fontSize}
        disabled={disabled}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
}

BaseIconButton.propTypes = {
  tip: PropTypes.string,
  onClickFunc: PropTypes.func,
  icon: PropTypes.object,
  sx: PropTypes.object,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  disabled: PropTypes.bool,
}

BaseIconButton.defaultProps = {
  tip: '',
  onClickFunc: () => {},
  icon: null,
  sx: {},
  color: '',
  fontSize: 'medium',
  disabled: false,
}

export default BaseIconButton
