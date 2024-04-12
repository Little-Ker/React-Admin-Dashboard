import React from 'react'
import PropTypes from 'prop-types'
import {
  TextField
} from '@mui/material'

function BaseTextField(props) {
  const {
    label, value, setValue, readonly, width, placeholder, multiline, rows, sx,
  } = props

  return (
    <TextField
      disabled={readonly}
      value={value}
      onChange={event => setValue(event.target.value)}
      label={label}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      sx={{
        width,
        label: {
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translate(14px, 3px) scale(0.75)',
          transformOrigin: 'top left',
          '&.Mui-focused': {
            transform: 'translate(14px, 3px) scale(0.75)',
          },
        },
        input: {
          padding: (label) ? '20px 14px 8px 14px' : '8px 8px',
          '&::placeholder': {
            color: '#999',
          },
        },
        textarea: {
          padding: (label) ? '5px 0 0 0' : '0',
          '&::placeholder': {
            color: '#999',
          },
        },
        legend: {
          display: 'none',
        },
        fieldset: {
          top: 0,
        },
        ...sx,
      }}
    />
  )
}

BaseTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  readonly: PropTypes.bool,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  sx: PropTypes.object,
}

BaseTextField.defaultProps = {
  label: '',
  value: '',
  setValue: () => {},
  readonly: false,
  width: '100%',
  placeholder: '',
  multiline: false,
  rows: 1,
  sx: {},
}

export default BaseTextField
