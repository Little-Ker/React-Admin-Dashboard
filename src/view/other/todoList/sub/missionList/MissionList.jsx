import React, {
  useState, useCallback
} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  IconButton, Drawer, Button
} from '@mui/material'
import {
  Add, Edit, Check, Replay, Close, DeleteForever
} from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Dialog from 'component/dialog'
import TextField from 'component/textField'
import NoticeStack from 'component/noticeStack'
import Mission from '../mission'
import MissionSetting from '../missionSetting'
import styles from './missionList.module.sass'
import useDataState from '../zustand/dataState'

function MissionList(props) {
  const { mode } = useSelector(state => state.setting)
  const { t } = useTranslation()
  const { missionsData } = useDataState()

  const [openSetting, setOpenSetting] = useState(null)
  const [isOpenAddSetting, setIsOpenAddSetting] = useState(false)

  const [isOpenDeleteSuccessTip, setIsOpenDeleteSuccessTip] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)
  const [chooseBoardIndex, setChooseBoardIndex] = useState(null)

  const [editListId, setEditListId] = useState(null)
  const [editListName, setEditListName] = useState('')

  const [missionList, setMissionList] = useState(missionsData)

  const handleClose = useCallback(() => {
    setOpenSetting(null)
    setIsOpenAddSetting(false)
  }, [])

  const reorder = useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }, [])

  const move = useCallback((source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)
    destClone.splice(droppableDestination.index, 0, removed)
    return { sourceClone, destClone }
  }, [])

  const getList = useCallback((groupId) => {
    const findGroup = missionList.find(cur => cur?.id === groupId)
    return (findGroup) ? findGroup.list : null
  }, [missionList])

  const onDragEnd = useCallback(async (result) => {
    try {
      const { source, destination } = result
      if (!destination) return
      // 同區段內移動
      if (source.droppableId === destination.droppableId) {
        const reorderList = reorder(
          getList(destination.droppableId),
          source.index,
          destination.index
        )
        setMissionList((prev) => {
          prev[destination.droppableId].list = reorderList
          return [...prev]
        })
      } else {
        // 不同區段移動
        const result2 = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        )
        setMissionList((prev) => {
          prev[source.droppableId].list = result2?.sourceClone
          prev[destination.droppableId].list = result2?.destClone
          return [...prev]
        })
      }
    } catch (e) {
      console.log(e)
    }
  }, [getList, move, reorder])

  const onClickReset = useCallback((e) => {
    setEditListId(null)
    setEditListName('')
    e.stopPropagation()
  }, [])

  const onClickEditListName = useCallback((id, name) => {
    setEditListId(id)
    setEditListName(name)
  }, [])

  const onClickCheck = useCallback((posIndex) => {
    setMissionList((prev) => {
      const newMissionList = [...prev]
      newMissionList[posIndex].title = editListName
      return newMissionList
    })

    setEditListId(null)
    setEditListName('')
  }, [editListName])

  const onClickAddList = useCallback((e) => {
    setMissionList((prev) => {
      const newMissionList = [...prev]
      newMissionList.push({
        id: prev.length.toString(),
        title: editListName,
        list: [],
      })
      return newMissionList
    })

    onClickReset(e)
  }, [editListName, onClickReset])

  const onClickDelete = useCallback(() => {
    setMissionList((prev) => {
      const newMissionList = [...prev]
      newMissionList.splice(chooseBoardIndex, 1)
      return newMissionList
    })
    setIsOpenDeleteSuccessTip(true)
    setChooseBoardIndex(null)
    setOpenDialog(false)
  }, [chooseBoardIndex])

  const onClickDeleteBoard = useCallback((index) => {
    setChooseBoardIndex(index)
    setOpenDialog(true)
  }, [])

  const onClickAddCard = useCallback((type) => {
    setIsOpenAddSetting(true)
    setOpenSetting({
      id: type,
    })
  }, [])

  return (
    <div className={styles.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        {missionList?.map((cur, index) => (
          <Droppable droppableId={cur.id} key={cur.id}>
            {(provided, snapshot) => (
              <div className={styles.list} style={{ background: (mode === 'Light') ? '#d3d3d3c2' : '#31353d' }}>
                <div className={styles.listHeader}>
                  {(editListId !== cur.id) && (
                    <>
                      <p className={styles.listTitle}>{t(cur.title)}</p>
                      <div>
                        <IconButton onClick={() => onClickEditListName(cur.id, cur.title)}>
                          <Edit color="info" fontSize="small" />
                        </IconButton>
                        <IconButton onClick={e => onClickDeleteBoard(index)}>
                          <DeleteForever color="error" fontSize="small" />
                        </IconButton>
                      </div>
                    </>
                  )}
                  {(editListId === cur.id) && (
                    <>
                      <TextField
                        value={editListName}
                        setValue={setEditListName}
                        placeholder={t('欄位名稱')}
                      />
                      <div className={styles.controlList}>
                        <IconButton color="success" disabled={editListName.length === 0} onClick={() => onClickCheck(index)}>
                          <Check fontSize="small" />
                        </IconButton>
                        <IconButton onClick={e => onClickReset(e)}>
                          <Replay fontSize="small" />
                        </IconButton>
                      </div>
                    </>
                  )}
                </div>
                <div
                  ref={provided.innerRef}
                  className={styles.taskBox}
                >
                  {cur.list?.map((item, index2) => (
                    <Draggable
                      key={(item.id.toString())}
                      draggableId={(item.id.toString())}
                      index={index2}
                    >
                      {(provided2, snapshot2) => (
                        <div
                          ref={provided2.innerRef}
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...provided2.draggableProps}
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...provided2.dragHandleProps}
                        >
                          <Button onClick={() => setOpenSetting(item)} className={styles.gameCard}>
                            <Mission missionData={item} />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <Button
                  className={clsx(styles.addBtn, styles.addCardBtn)}
                  onClick={() => onClickAddCard(cur.id)}
                >
                  <Add fontSize="small" />
                  <p className={styles.text}>{t('Add Card')}</p>
                </Button>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <Button
        className={clsx(styles.addBtn, styles.sectionBtn)}
        style={{ background: (mode === 'Light') ? '#d3d3d3c2' : '#31353d' }}
        onClick={() => onClickEditListName('add', '')}
      >
        <div className={styles.btn}>
          <Add fontSize="small" />
          <p className={styles.text}>{t('Add Section')}</p>
        </div>
        {(editListId === 'add') && (
          <div className={clsx(styles.btn, styles.addButton)}>
            <TextField
              value={editListName}
              setValue={setEditListName}
              placeholder={t('欄位名稱')}
              width="100%"
            />
            <div className={styles.controlList}>
              <IconButton color="success" disabled={editListName.length === 0} onClick={e => onClickAddList(e)}>
                <Check fontSize="small" />
              </IconButton>
              <IconButton onClick={e => onClickReset(e)}>
                <Close color="error" fontSize="small" />
              </IconButton>
            </div>
          </div>
        )}
      </Button>
      <Drawer
        anchor={'right'}
        open={!!openSetting}
        onClose={handleClose}
      >
        <MissionSetting
          onClose={handleClose}
          missionData={openSetting}
          missionList={missionList}
          setMissionList={setMissionList}
          isOpenAddSetting={isOpenAddSetting}
        />
      </Drawer>
      <Dialog
        title={'提醒'}
        open={openDialog}
        setOpen={setOpenDialog}
        isBgClose
        buttonList={(
          <div className={styles.buttonList}>
            <Button onClick={() => setOpenDialog(false)} variant="outlined">
              {t('取消')}
            </Button>
            <Button onClick={onClickDelete} variant="contained">
              {t('確認')}
            </Button>
          </div>
        )}
      >
        <div>
          <p>{t('確認要刪除?')}</p>
        </div>
      </Dialog>
      <NoticeStack
        type="success"
        text={t('刪除成功')}
        open={isOpenDeleteSuccessTip}
        setOpen={setIsOpenDeleteSuccessTip}
      />
    </div>
  )
}

MissionList.propTypes = {
  missionListData: PropTypes.array,
}

MissionList.defaultProps = {
  missionListData: [],
}

export default MissionList
