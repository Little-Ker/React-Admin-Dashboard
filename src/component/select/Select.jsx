import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import {
  MenuItem, Box, Chip, Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Select from '@mui/material/Select'

export default function BasicSelect(props) {
  const {
    label, options, value, setValue, readonly, placeholder, multiple, renderValueFn,
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
          multiple={multiple}
          displayEmpty
          native={false}
          label={label}
          value={value}
          onChange={handleChange}
          defaultValue={''}
          renderValue={(selected) => {
            console.log('selected', selected)
            if ((!multiple && !selected) || (multiple && selected?.length === 0)) {
              return <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{placeholder || t('請選擇')}</Typography>
            }
            if (multiple) {
              console.log('value', value)
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((cur) => {
                    const findData = options.find(cur2 => cur2?.id === cur || cur2 === cur)
                    return (findData) ? (
                      (renderValueFn) ? renderValueFn(findData) : <Chip key={findData?.id} label={findData?.name} />) : ''
                  })}
                </Box>
              )
            }
            const findData = options.find(cur => selected?.id === cur?.id || selected === cur?.id)
            return (
              (selected) && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(findData) ? ((renderValueFn) ? renderValueFn(findData) : <p>{findData?.name}</p>) : ''}
                </Box>
              )
            )
          }}
          sx={{
            '& .MuiSelect-select': {
              padding: (label) ? (multiple) ? '25px 14px 6px 14px' : '20px 14px 8px 15px' : '14px 14px',
            },
            legend: {
              display: 'none',
            },
            fieldset: {
              top: 0,
            },
          }}
        >
          {console.log('options', options)}
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
    PropTypes.array,
  ]),
  setValue: PropTypes.func,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  renderValueFn: PropTypes.func,
}

BasicSelect.defaultProps = {
  label: '',
  options: [],
  value: null,
  setValue: () => {},
  readonly: false,
  placeholder: '',
  multiple: false,
  renderValueFn: null,
}
