import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, IconButton, DialogContent, DialogActions
} from '@mui/material'
import { Close } from '@mui/icons-material'
import styles from './dialog.module.sass'

function BasicDialog(props) {
  const {
    children, open, setOpen, title, isBgClose, buttonList,
  } = props

  const handleClose = useCallback(() => {
    if (!isBgClose) return
    setOpen(false)
  }, [setOpen, isBgClose])

  return (
    <Dialog
      onClose={(handleClose)}
      open={open}
      style={{ zIndex: 9999999 }}
      className={styles.dialog}
      PaperProps={{
        style: {
          maxWidth: 'none',
        },
      }}
    >
      <DialogTitle className={styles.dialogTitle}>
        <p className={styles.text}>{title}</p>
        <IconButton
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {children}
      </DialogContent>
      <DialogActions className={styles.dialogAction}>
        {buttonList}
      </DialogActions>
    </Dialog>
  )
}

BasicDialog.propTypes = {
  children: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
  isBgClose: PropTypes.bool,
  buttonList: PropTypes.object,
}

BasicDialog.defaultProps = {
  children: {},
  open: false,
  setOpen: () => {},
  title: '',
  isBgClose: true,
  buttonList: null,
}

export default BasicDialog
