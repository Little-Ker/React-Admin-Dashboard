import React, {
  useEffect
} from 'react'
import axios from 'axios'
import {
  useDispatch
} from 'react-redux'
import {
  addTodo
} from 'redux/todoSlice'
import {
  Typography
} from '@mui/material'
import TodoList from 'component/test/TodoList'

function ReduxEX() {
  const dispatch = useDispatch()
  return (
    <div>
      <Typography variant="h5" color="primary" style={{ marginTop: '30px' }}>Redux 讀改資料</Typography>
      <TodoList />
      <button type="button" onClick={() => dispatch(addTodo('test'))}>add</button>
    </div>
  )
}

function AxiosEx() {
  const [data, setData] = React.useState([])

  useEffect(() => {
    axios.get('/data/dataList.json').then((response) => {
      setData(response.data.titleData)
    })
  }, [])

  return (
    <div>
      <Typography variant="h5" color="primary" style={{ marginTop: '30px' }}>Axios</Typography>
      {data.map((item, index) => (
        <p key={`${index.toString()}`}>
          {item.title}
          {' '}
          :
          {' '}
          {item.txt}
        </p>
      ))}
    </div>
  )
}

function ViewA() {
  return (
    <>
      <Typography variant="h4" color="primary">ViewA</Typography>
      <AxiosEx />
      <ReduxEX />
    </>
  )
}

export default ViewA
