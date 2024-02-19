import React from 'react'
import { SupervisedUserCircle, VpnKey } from '@mui/icons-material'
import ViewA from 'view/ViewA'
import ViewB from 'view/ViewB'

const routes = [
  {
    category: 'MANAGEMENT',
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
    category: 'MANAGEMENT222',
    list: [{
      name: 'ViewB',
      to: '/viewB11',
      icon: <SupervisedUserCircle />,
      view: <ViewB />,
    }],
  },
]

export default routes
