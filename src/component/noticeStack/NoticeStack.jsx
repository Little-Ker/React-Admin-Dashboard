import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Slide, Snackbar, Alert
} from '@mui/material'

export default function NoticeStack(props) {
  const {
    type, text, open, setOpen,
  } = props

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <div>
      <Slide direction="left" in={open}>
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity={type}
            sx={{ width: '400px' }}
          >
            {text}
          </Alert>
        </Snackbar>
      </Slide>
    </div>
  )
}

NoticeStack.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}

NoticeStack.defaultProps = {
  type: 'success',
  text: '',
  open: false,
  setOpen: () => {},
}
