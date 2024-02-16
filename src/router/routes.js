import React from 'react'
import { SupervisedUserCircle, VpnKey } from '@mui/icons-material'

const routes = [
  {
    category: 'MANAGEMENT',
    list: [{
      name: 'ViewB',
      to: '/viewB',
      icon: <SupervisedUserCircle />,
    }, {
      name: 'Customers',
      icon: <VpnKey />,
      subLink: [{
        name: 'Cards1',
        to: '/dashboard',
      }, {
        name: 'Cards2',
        to: '/viewA2',
      }],
    }, {
      name: 'Customers22',
      icon: <VpnKey />,
      subLink: [{
        name: 'Cards111',
        to: '/viewA3',
      }, {
        name: 'Cards222',
        to: '/viewA4',
      }],
    }, {
      name: 'ViewB',
      to: '/viewB11',
      icon: <SupervisedUserCircle />,
    }],
  },
  {
    category: 'MANAGEMENT222',
    list: [{
      name: 'ViewB',
      to: '/viewB11',
      icon: <SupervisedUserCircle />,
    }],
  },
  {
    category: 'MANAGEMENT',
    list: [{
      name: 'ViewB',
      to: '/viewB',
      icon: <SupervisedUserCircle />,
    }, {
      name: 'Customers',
      icon: <VpnKey />,
      subLink: [{
        name: 'Cards1',
        to: '/viewA1',
      }, {
        name: 'Cards2',
        to: '/viewA2',
      }],
    }, {
      name: 'Customers22',
      icon: <VpnKey />,
      subLink: [{
        name: 'Cards111',
        to: '/viewA3',
      }, {
        name: 'Cards222',
        to: '/viewA4',
      }],
    }, {
      name: 'ViewB',
      to: '/viewB11',
      icon: <SupervisedUserCircle />,
    }],
  },
  {
    category: 'MANAGEMENT',
    list: [{
      name: 'ViewB',
      to: '/viewB',
      icon: <SupervisedUserCircle />,
    }, {
      name: 'Customers',
      icon: <VpnKey />,
      subLink: [{
        name: 'Cards1',
        to: '/viewA1',
      }, {
        name: 'Cards2',
        to: '/viewA2',
      }],
    }, {
      name: 'Customers22',
      icon: <VpnKey />,
      subLink: [{
        name: 'Cards111',
        to: '/viewA3',
      }, {
        name: 'Cards222',
        to: '/viewA4',
      }],
    }, {
      name: 'ViewB',
      to: '/viewB11',
      icon: <SupervisedUserCircle />,
    }],
  },
]

export default routes
