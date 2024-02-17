/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useCallback, useMemo, useState
} from 'react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ChevronRight, FiberManualRecord } from '@mui/icons-material'
import { Collapse } from '@mui/material'
import routes from 'router/routes'
import { createTheme } from 'theme'
import styles from './navbar.module.sass'

export default function Navbar() {
  const { mainColor, lang } = useSelector(state => state.setting)
  const location = useLocation()

  const theme = createTheme({ mainColor })

  const defaultChecked = useMemo(() => {
    const checkList = []
    routes?.forEach((cur, index) => {
      const checks = []
      cur.list.forEach((cur2, index2) => {
        let findPath = null
        if (cur2?.subLink) findPath = cur2?.subLink?.find(cur3 => location?.pathname === `${cur3?.to}`)
        checks.push(!!findPath)
      })
      checkList.push(checks)
    })
    return checkList
  }, [location?.pathname])
  const [checked, setChecked] = useState(defaultChecked)

  const changeCheck = useCallback((index, index2) => {
    setChecked((prev) => {
      const checkList = [...prev]
      checkList[index][index2] = !checkList[index][index2]
      return checkList
    })
  }, [])

  const menuLink = useCallback((link, index, subLink) => (
    <Link
      key={`${index.toString()}`}
      to={`${link?.to}?${lang}`}
      className={clsx(styles.link, location?.pathname === `${link.to}` && styles.active)}
      style={{ color: (location?.pathname === `${link.to}`) ? theme?.palette?.primary?.main : '#fff' }}
    >
      {(link?.icon) ? link?.icon : <FiberManualRecord className={styles.dot} fontSize="small" />}
      <p
        className={clsx(styles.linkText, subLink && styles.subLinkText)}
        style={{ color: (location?.pathname === `${link.to}`) ? theme?.palette?.primary?.main : '#fff' }}
      >
        {link.name}
      </p>
    </Link>
  ), [lang, location?.pathname, theme])

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        {'VIVI'}
      </div>
      {routes?.map((cur, index) => (
        <div key={`${index.toString()}`}>
          <p className={styles.category}>{cur?.category}</p>
          {cur?.list.map((cur2, index2) => (
            <div key={`${index2.toString()}`}>
              {(cur2?.to) ? (
                menuLink(cur2, index, false)
              ) : (
                <div>
                  <div
                    className={clsx(styles.link, styles.linkMenu)}
                    onClick={() => changeCheck(index, index2)}
                  >
                    <div className={styles.linkMenu}>
                      {cur2?.icon}
                      <p className={styles.linkText}>{cur2?.name}</p>
                    </div>
                    <ChevronRight className={clsx(checked[index][index2] && styles.open)} />
                  </div>
                  <Collapse in={checked[index][index2]}>
                    {cur2?.subLink?.map((cur3, index3) => (
                      menuLink(cur3, index3, true)
                    ))}
                  </Collapse>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
