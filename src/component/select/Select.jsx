import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import {
  MenuItem, Box
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Select from '@mui/material/Select'

export default function BasicSelect(props) {
  const {
    label, options, value, setValue, readonly, placeholder,
  } = props
  const { t } = useTranslation()

  const handleChange = useCallback((event) => {
    setValue(event?.id || event?.target?.value)
  }, [setValue])

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel
          sx={{
            transform: 'translate(14px, 3px) scale(0.75)',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {label}
        </InputLabel>
        <Select
          disabled={readonly}
          displayEmpty
          native={false}
          label={label}
          onChange={handleChange}
          defaultValue={''}
          renderValue={() => {
            const findData = options.find(cur => value?.id === cur?.id || value === cur?.id)
            return (
              (value) ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  <p>{(findData) ? findData?.name : ''}</p>
                </Box>
              ) : (
                <p>{placeholder || t('請選擇')}</p>
              )
            )
          }}
          sx={{
            '& .MuiSelect-select': {
              padding: (label) ? '20px 14px 8px 14px' : '14px 14px',
            },
            legend: {
              display: 'none',
            },
            fieldset: {
              top: 0,
            },
          }}
        >
          {options.map(cur => (
            <MenuItem
              key={cur?.id}
              value={cur?.id}
              onClick={() => handleChange(cur)}
            >
              {cur.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

BasicSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  setValue: PropTypes.func,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
}

BasicSelect.defaultProps = {
  label: '',
  options: [],
  value: null,
  setValue: () => {},
  readonly: false,
  placeholder: '',
}
