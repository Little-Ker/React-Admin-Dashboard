import React from 'react'
import PropTypes from 'prop-types'
import {
  TextField
} from '@mui/material'

function BaseTextField(props) {
  const {
    label, value, setValue, readonly,
  } = props

  return (
    <TextField
      disabled={readonly}
      value={value}
      onChange={event => setValue(event.target.value)}
      label={label}
      sx={{
        minWidth: '200px',
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
          padding: (label) ? '20px 14px 8px 14px' : '14px 14px',
        },
        legend: {
          display: 'none',
        },
        fieldset: {
          top: 0,
        },
      }}
    />
  )
}

BaseTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  readonly: PropTypes.bool,

}

BaseTextField.defaultProps = {
  label: '',
  value: '',
  setValue: () => {},
  readonly: false,
}

export default BaseTextField
