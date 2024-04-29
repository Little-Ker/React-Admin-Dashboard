/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  Avatar, AvatarGroup, Button
} from '@mui/material'
import {
  KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import MainLayout from 'component/mainLayout'
import Select from 'component/select'
import IconButton from 'component/iconButton'
// import MissionList from './sub/missionList'
// import useDataState from './sub/zustand/dataState'
import styles from './calender.module.sass'

function Calender() {
  const { t } = useTranslation()
  // const { members, groupOptions } = useDataState()

  const [today, setToday] = useState({
    year: 0,
    month: 0,
    date: 0,
    day: 0,
  })

  const [calendar, setCalendar] = useState({
    year: 0,
    month: 0,
    date: 0,
    day: 0,
  })

  const totalWeekCount = useMemo(() => 6, [])

  const totalDayCount = useMemo(() => 7, [])

  const week = useMemo(() => [{ text: '日', eng: 'SUN' }, { text: '一', eng: 'MON' }, { text: '二', eng: 'TUS' }, { text: '三', eng: 'WED' }, { text: '四', eng: 'THU' }, { text: '五', eng: 'FRI' }, { text: '六', eng: 'SAT' }], [])

  const getCalendarFirstDay = useMemo(() => {
    const getMonthFirstDay = new Date(calendar.year, calendar.month - 1, 1)
    const date = new Date(calendar.year, calendar.month - 1, 1 - getMonthFirstDay.getDay())
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
      day: date.getDay(),
    }
  }, [calendar.month, calendar.year])

  const calendarMonthCalc = useMemo(() => {
    const data = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(getCalendarFirstDay.year, getCalendarFirstDay.month - 1, getCalendarFirstDay.date + i)
      data.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        day: date.getDay(),
      })
    }
    return data
  }, [getCalendarFirstDay])

  useEffect(() => {
    console.log('calendarMonthCalc', calendarMonthCalc)
  }, [calendarMonthCalc])

  const setZero = useCallback((num) => {
    if (num < 10) {
      return `0${num}`
    } return num
  }, [])

  const onClickAdjustYear = useCallback((num) => {
    setCalendar(prev => ({
      ...prev,
      year: prev.year + num,
    }))
  }, [])

  const onClickAdjustMonth = useCallback((num) => {
    setCalendar((prev) => {
      let month = prev.month + num
      let { year } = prev

      if (month > 12) {
        year += 1
        month = 1
      }
      if (month < 1) {
        month = 12
        year -= 1
      }

      return {
        ...prev,
        month,
        year,
      }
    })
  }, [])

  const onClickAdjustToday = useCallback(() => {
    const todayDate = new Date()
    setToday({
      year: todayDate.getFullYear(),
      month: todayDate.getMonth() + 1,
      date: todayDate.getDate(),
      day: todayDate.getDay(),
    })
    setCalendar({
      year: todayDate.getFullYear(),
      month: todayDate.getMonth() + 1,
      date: todayDate.getDate(),
      day: todayDate.getDay(),
    })
  }, [])

  useEffect(() => {
    onClickAdjustToday()
  }, [onClickAdjustToday])

  return (
    <MainLayout>
      <div className={styles.root}>
        <h2 className={styles.title}>{t('Calender')}</h2>
        <div className={styles.calendar}>
          <div className={styles.header}>
            <IconButton
              tip={t('上一年')}
              onClickFunc={() => onClickAdjustYear(-1)}
              icon={<KeyboardDoubleArrowLeft />}
            />
            <IconButton
              tip={t('上個月')}
              onClickFunc={() => onClickAdjustMonth(-1)}
              icon={<KeyboardArrowLeft />}
            />
            <p className={styles.calendarTitle}>{`${calendar.year} ${t('年')} ${setZero(calendar.month)} ${t('月')}`}</p>
            <IconButton
              tip={t('下個月')}
              onClickFunc={() => onClickAdjustMonth(1)}
              icon={<KeyboardArrowRight />}
            />
            <IconButton
              tip={t('下一年')}
              onClickFunc={() => onClickAdjustYear(1)}
              icon={<KeyboardDoubleArrowRight />}
            />
            <Button
              variant="contained"
              onAbort={onClickAdjustToday}
            >
              {t('今天')}
            </Button>
          </div>

          {/* <div className="d-flex justify-content-between">
            <p className="icon-left-open show-cursor-pointer" :class="{'hideOpcity':calendarMonth == todayMonth} " @click="clickMonthBtn(-1);"></p>
            <p className="title text-center main-white-text align-self-center">{{calendarYear}}年 {{setZero(calendarMonth + 1)}}月</p>
            <p className="icon-right-open show-cursor-pointer" :class="{'hideOpcity':calendarMonth == getNextMonth(todayMonth)}" @click="clickMonthBtn(1);"></p>
        </div> */}
          <div className={styles.weekDay}>
            {week.map((cur, index) => (
              <div key={cur.text} className={styles.day}>
                <p>{cur.text}</p>
                <p className="dayEng">{cur.eng}</p>
              </div>
            ))}
          </div>
          {[...Array(totalWeekCount).keys()].map(i => (
            <div key={i} className={styles.week}>
              {[...Array(totalDayCount).keys()].map(j => (
                <div key={j} className={styles.date}>
                  {console.log(calendarMonthCalc, calendarMonthCalc[((i) * 7 + (j + 1)) - 1])}
                  {(calendarMonthCalc[((i) * 7 + (j + 1)) - 1]) && (
                    <p>{calendarMonthCalc[((i) * 7 + (j + 1)) - 1].date}</p>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/*  <div v-for="i in getWeekCount" :key="i" class="week d-flex">
           <div
                v-for="j in 7" :key="j"
                class="date"
                :class="{ today:setTodayClass(i, j), other:setOtherClass(i, j),
                          canChooseDay:setCanChooseDayClass(i, j), notChooseDay:setNotChooseDayClass(i, j),
                          chooseDay: calendarMonthCalc[(i-1)*7+j-1].year === chooseDayYear && calendarMonthCalc[(i-1)*7+j-1].month === chooseDayMonth && calendarMonthCalc[(i-1)*7+j-1].date === chooseDayDate,
                }" @click="chooseDateFn(i, j, calendarMonthCalc[(i-1)*7+j-1])"
            >
                <p>{{calendarMonthCalc[(i-1)*7+j-1].date}}</p>
            </div>
        </div> */}
        </div>
      </div>
    </MainLayout>
  )
}

export default Calender
