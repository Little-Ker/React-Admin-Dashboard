import React, {
  useCallback, useMemo, useState
} from 'react'
import PropTypes from 'prop-types'
import TextField from 'component/textField'
import Select from 'component/select'
import {
  ColorLens, DeleteForever, Edit, Add, RemoveCircleOutline, EditOff, Close, Check
} from '@mui/icons-material'
import {
  IconButton, Button, Avatar, Chip, FormGroup, Checkbox, SpeedDial, SpeedDialAction
} from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import ImagePicker from 'component/imagePicker'
import Dialog from 'component/dialog'
import clsx from 'clsx'
import useDataState from '../zustand/dataState'
import styles from './missionSetting.module.sass'

function MissionSetting(props) {
  const {
    missionData, onClose, missionList, isOpenAddSetting,
  } = props
  const { t } = useTranslation()
  const { members, setTransOptions } = useDataState()

  console.log('missionData', missionData)

  const colors = useMemo(() => ['#000', '#fab', '#ffa600', '#1b98ff', '#8966fb'], [])

  const [openDialog, setOpenDialog] = useState(false)

  const defaultPickColor = useMemo(() => missionData?.color || colors[0], [colors, missionData])
  const [pickColor, setPickColor] = useState(defaultPickColor)

  const defaultImgSrc = useMemo(() => missionData?.imgUrl || '', [missionData])
  const [imgSrc, setImgSrc] = useState(defaultImgSrc)

  const defaultTasks = useMemo(() => missionData?.tasks || [], [missionData])
  const [checklist, setChecklist] = useState(defaultTasks)

  const [taskName, setTaskName] = useState('')

  const [comment, setComment] = useState('')

  const [isOpenEditMode, setIsOpenEditMode] = useState(isOpenAddSetting)

  const typeOptions = useMemo(() => {
    const options = missionList?.map(cur => ({
      id: cur.id,
      name: cur.title,
    }))
    return options
  }, [missionList])

  const defaultBoardType = useMemo(() => {
    const findData = missionList?.find((cur) => {
      const findListData = cur?.list?.find(cur2 => cur2.id === missionData?.id)
      return !!findListData
    })
    return findData?.id || missionData?.id
  }, [missionData?.id, missionList])
  const [boardType, setBoardType] = useState(defaultBoardType)

  const getDateTime = useCallback(value => format(value, 'yyyy/MM/dd HH:mm'), [])

  const defaultSelectedMember = useMemo(() => missionData?.member || [], [missionData])
  const [selectedMember, setSelectedMember] = useState(defaultSelectedMember)

  const getMemberData = useCallback(name => members?.find(cur => cur.name === name), [members])

  const renderChip = useCallback((data) => {
    const memberData = getMemberData(data?.name)
    return (
      <Chip
        avatar={<Avatar alt={memberData?.name} src={memberData?.imgUrl} />}
        label={memberData?.name}
        variant="outlined"
        key={memberData?.name}
      />
    )
  }, [getMemberData])

  const onAddTask = useCallback(() => {
    setChecklist((prev) => {
      const newPrev = [...prev]
      newPrev.push({
        taskName,
        isCheck: false,
      })
      return newPrev
    })
    setTaskName('')
  }, [taskName])

  const onDeleteTask = useCallback((index) => {
    setChecklist((prev) => {
      const newPrev = [...prev]
      newPrev.splice(index, 1)
      return newPrev
    })
  }, [])

  const onChangeTask = useCallback((check, index) => {
    setChecklist((prev) => {
      const newPrev = [...prev]
      newPrev[index].isCheck = check
      return newPrev
    })
  }, [])

  const onOpenEditMode = useCallback((bool) => {
    setIsOpenEditMode(bool)
  }, [])

  const onClickClose = useCallback((type) => {
    setOpenDialog(false)
    onClose(false)
    console.log('===type', type)
  }, [onClose])

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Select
          label={('分類')}
          options={typeOptions}
          value={boardType}
          setValue={setBoardType}
          readonly={!isOpenEditMode}
        />
        {(!isOpenAddSetting) && (
          <div>
            {(isOpenEditMode) ? (
              <IconButton
                onClick={() => onOpenEditMode(false)}
                className={styles.iconBtn}
              >
                <EditOff />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => onOpenEditMode(true)}
                className={styles.iconBtn}
              >
                <Edit />
              </IconButton>
            )}
            <IconButton
              onClick={() => setOpenDialog(true)}
              className={styles.iconBtn}
            >
              <DeleteForever color="error" />
            </IconButton>
          </div>
        )}
        {(isOpenAddSetting) && (
          <div>
            <IconButton color="success" onClick={() => onClickClose('Add')} className={styles.iconBtn}>
              <Check fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onClickClose('Close')} className={styles.iconBtn}>
              <Close color="error" fontSize="small" />
            </IconButton>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.setting}>
          <SpeedDial
            ariaLabel="SpeedDial playground example"
            open={isOpenEditMode}
            icon={<ColorLens fontSize="small" />}
            direction={'right'}
            FabProps={{
              sx: {
                bgcolor: pickColor,
                borderRadius: '.5rem',
                width: '35px',
                height: '30px',
                '&:hover': {
                  bgcolor: pickColor,
                },
              },
            }}
          >
            {colors.map(cur => (
              <SpeedDialAction
                key={cur}
                sx={{ background: cur }}
                className={clsx(styles.colorPicker, cur === pickColor && styles.active)}
                onClick={() => setPickColor(cur)}
                FabProps={{
                  sx: {
                    bgcolor: cur,
                    '&:hover': {
                      bgcolor: cur,
                    },
                  },
                }}
              />
            ))}
          </SpeedDial>
          <Select
            label={t('負責人員')}
            value={selectedMember}
            setValue={setSelectedMember}
            multiple
            renderValueFn={renderChip}
            options={setTransOptions(members, 'name', 'name')}
            readonly={!isOpenEditMode}
          />
        </div>
        <div className={styles.setting}>
          <ImagePicker
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            readonly={!isOpenEditMode}
          />
        </div>
        <div className={styles.setting}>
          <TextField
            label={('標題')}
            value={missionData?.title}
            readonly={!isOpenEditMode}
          />
        </div>
        <div className={styles.setting}>
          <TextField
            label={('描述')}
            value={missionData?.description}
            multiline
            rows={3}
            readonly={!isOpenEditMode}
          />
        </div>
      </div>
      <div className={clsx(styles.content, styles.taskContent)}>
        <p className={styles.checklistHeader}>
          {t('任務列表')}
        </p>
        {(checklist?.length > 0) && (
          <FormGroup>
            {checklist?.map((cur, index) => (
              <div key={cur.id} className={styles.task}>
                <div className={styles.taskName}>
                  <Checkbox
                    checked={cur?.isCheck}
                    onChange={(e) => { onChangeTask(e.target.checked, index) }}
                  />
                  <p className={clsx(cur.isCheck && styles.checked)}>{cur.taskName}</p>
                </div>
                {(isOpenEditMode) && (
                  <IconButton onClick={() => onDeleteTask(index)}>
                    <RemoveCircleOutline color="error" />
                  </IconButton>
                )}
              </div>
            ))}
          </FormGroup>
        )}
        {(isOpenEditMode) && (
          <div className={styles.inputTask}>
            <TextField
              placeholder={t('任務描述...')}
              value={taskName}
              setValue={setTaskName}
              width={'220px'}
            />
            <Button disabled={taskName.length === 0} onClick={onAddTask} variant="contained" size="small" startIcon={<Add />}>
              {t('任務')}
            </Button>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        {(missionData?.messages?.length > 0) && (
          <div className={styles.messages}>
            {missionData?.messages?.map((cur) => {
              const memberData = getMemberData(cur?.name)
              return (
                <div key={cur.id} className={styles.message}>
                  <Avatar alt={memberData?.name} src={memberData?.imgUrl} />
                  <div className={styles.messageContent}>
                    <p>{cur.content}</p>
                    <p className={styles.date}>{getDateTime(cur.date)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {(!isOpenAddSetting) && (
          <div className={styles.comment}>
            <Avatar alt={'Vivi'} src="/static/images/avatar/1.jpg" />
            <div className={styles.comment_content}>
              <div className={styles.comment_textField}>
                <TextField
                  label={('留言')}
                  value={comment}
                  setValue={setComment}
                  multiline
                  rows={3}
                />
              </div>
              <Button
                variant="contained"
                className={styles.comment_btn}
                disabled={comment.length === 0}
              >
                {t('送出')}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Dialog
        title={'提醒'}
        open={openDialog}
        isBgClose
        buttonList={(
          <div className={styles.buttonList}>
            <Button onClick={() => setOpenDialog(false)} variant="outlined">
              {t('取消')}
            </Button>
            <Button onClick={() => onClickClose('Delete')} variant="contained">
              {t('確認')}
            </Button>
          </div>
        )}
      >
        <p>{t('確認要刪除?')}</p>
      </Dialog>
    </div>
  )
}

MissionSetting.propTypes = {
  missionData: PropTypes.object,
  onClose: PropTypes.func,
  missionList: PropTypes.array,
  isOpenAddSetting: PropTypes.bool,
}

MissionSetting.defaultProps = {
  missionData: null,
  onClose: () => {},
  missionList: [],
  isOpenAddSetting: false,
}

export default MissionSetting
