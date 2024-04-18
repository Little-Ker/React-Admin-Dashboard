import React from 'react'
import { SupervisedUserCircle, VpnKey, Dashboard } from '@mui/icons-material'
import ViewA from 'view/ViewA'
import ViewB from 'view/ViewB'
import TodoList from 'view/other/todoList'

const routes = [
  {
    category: 'Management',
    list: [{
      name: 'ViewB',
      to: '/viewB',
      icon: <SupervisedUserCircle />,
      view: <ViewB />,
    }, {
      name: 'Customers',
      icon: <VpnKey />,
      subLink: [{
        name: 'Cards1',
        to: '/dashboard',
        view: <ViewA />,
      }, {
        name: 'Cards2',
        to: '/viewA2',
        view: <ViewA />,
      }],
    }, {
      name: 'ViewB',
      to: '/viewB11',
      icon: <SupervisedUserCircle />,
      view: <ViewB />,
    }],
  },
  {
    category: 'Other',
    list: [{
      name: 'TodoList',
      to: '/todoList',
      icon: <Dashboard />,
      view: <TodoList />,
    }],
  },
]

export default routes
