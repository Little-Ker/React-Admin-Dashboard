import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button
} from '@mui/material'
import clsx from 'clsx'
import { t } from 'i18next'
import styles from './imagePicker.module.sass'

function ImagePicker(props) {
  const {
    imgSrc, setImgSrc, readonly,
  } = props

  const [isShowTip, setIsShowTip] = useState(false)

  const onFileUpload = (event) => {
    const file = event.target.files[0]
    setIsShowTip(false)
    if (file.size > 1 * 1024 * 1024) { // 1MB in bytes
      setIsShowTip(true)
      return
    }
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      setImgSrc(reader.result)
      const data = e.target.result
      const image = new Image()
      image.src = data
    }, false)
    if (file) reader.readAsDataURL(file)
  }

  return (
    <div className={styles.root}>
      <a>
        <Button
          className={clsx(styles.uploadBtn, imgSrc !== '' && styles.hideTextBtn)}
          type="file"
          component="label"
          sx={{ width: '100%' }}
          variant="outlined"
          disabled={readonly}
        >
          {(imgSrc !== '') && (
            <div className={styles.photo}>
              <img className={'img-fit'} src={imgSrc} alt="" />
              <p className={clsx(styles.textTip, !readonly && styles.showTextTip)}>{t('上傳圖片')}</p>
            </div>
          )}
          <input
            type={'file'}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onFileUpload}
          />
        </Button>
      </a>
      {(isShowTip) && (
        <p className={styles.tip}>{`*${t('圖片大小不可超過 1MB')}`}</p>
      )}
    </div>
  )
}

ImagePicker.propTypes = {
  imgSrc: PropTypes.string,
  setImgSrc: PropTypes.func,
  readonly: PropTypes.bool,
}

ImagePicker.defaultProps = {
  imgSrc: '',
  setImgSrc: () => {},
  readonly: false,
}

export default ImagePicker
