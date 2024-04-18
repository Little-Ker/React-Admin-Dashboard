import React, {
  useState
} from 'react'
import {
  Avatar, AvatarGroup
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import MainLayout from 'component/mainLayout'
import Select from 'component/select'
import MissionList from './sub/missionList'
import useDataState from './sub/zustand/dataState'
import styles from './todoList.module.sass'

function TodoList() {
  const { t } = useTranslation()
  const { members, groupOptions } = useDataState()

  const [group, setGroup] = useState(groupOptions[0]?.id)

  return (
    <MainLayout>
      <div className={styles.root}>
        <h2 className={styles.title}>{t('TodoList')}</h2>
        <div className={styles.header}>
          <div className={styles.block}>
            <Select
              label={t('群組')}
              options={groupOptions}
              value={group}
              setValue={setGroup}
            />
          </div>
          <div className={styles.block}>
            <AvatarGroup max={4}>
              {members.map(cur => (
                <Avatar key={cur.name} alt={cur.name} src={cur.imgUrl} />
              ))}
            </AvatarGroup>
          </div>
        </div>
        <MissionList />
      </div>
    </MainLayout>
  )
}

export default TodoList
