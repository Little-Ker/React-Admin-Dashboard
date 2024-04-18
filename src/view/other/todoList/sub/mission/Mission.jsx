import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Avatar, AvatarGroup
} from '@mui/material'
import { useSelector } from 'react-redux'
import {
  Checklist, Comment, EditNote
} from '@mui/icons-material'
import styles from './mission.module.sass'
import useDataState from '../zustand/dataState'

const avatarSize = '24px'

function Mission(props) {
  const {
    missionData,
  } = props

  const { mode } = useSelector(state => state.setting)
  const { members } = useDataState()

  const getMemberData = useCallback(name => members?.find(cur => cur.name === name), [members])

  const missionFinishCount = useMemo(() => {
    const finishCount = missionData?.tasks?.filter(cur => cur?.isCheck)
    return finishCount?.length
  }, [missionData])

  return (
    <div className={styles.root} style={{ background: (mode === 'Light') ? 'rgb(255 255 255 / 80%)' : 'rgb(13 18 26 / 80%)' }}>
      <div className={styles.header}>
        <div
          className={styles.color}
          style={{
            background: missionData?.color,
            marginBottom: (missionData?.member?.length > 0)
              ? 0 : '1rem',
          }}
        />
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatarGroup-avatar': {
              width: avatarSize,
              height: avatarSize,
            },
          }}
        >
          {missionData?.member?.map((cur) => {
            const memberData = getMemberData(cur)
            return (
              <Avatar
                sx={{ width: avatarSize, height: avatarSize }}
                key={memberData?.name}
                alt={memberData?.name}
                src={memberData?.imgUrl}
              />
            )
          })}
        </AvatarGroup>
      </div>
      {(missionData?.imgUrl) && (
        <img className={styles.img} style={{ width: '100%' }} src={missionData?.imgUrl} alt="" />
      )}
      <p className={styles.title}>{missionData?.title}</p>
      <div className={styles.footer}>
        <div className={styles.icon}>
          <EditNote fontSize="small" />
        </div>
        {(missionData?.tasks?.length > 0) && (
          <div className={styles.icon}>
            <Checklist fontSize="small" />
            <p className={styles.text}>
              {`${missionFinishCount}/${missionData?.tasks?.length}`}
            </p>
          </div>
        )}
        <div className={styles.icon}>
          <Comment fontSize="small" />
          <p className={styles.text}>{missionData?.messages?.length || 0}</p>
        </div>
      </div>
    </div>
  )
}

Mission.propTypes = {
  missionData: PropTypes.object,
}

Mission.defaultProps = {
  missionData: {},
}

export default Mission
