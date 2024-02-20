import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'

function MainLayout(props) {
  const { children } = props
  const { theme } = useSelector(state => state.setting)

  return (
    <Box sx={{
      backgroundColor: theme?.palette?.background?.default,
      height: '100%',
      padding: '0px 48px',
    }}
    >
      {children}
    </Box>
  )
}

MainLayout.propTypes = {
  children: PropTypes.object,
}

MainLayout.defaultProps = {
  children: {},
}

export default MainLayout
