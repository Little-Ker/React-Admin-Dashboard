import React, { useContext, useMemo } from 'react'
import {
  BrowserRouter as Router, Route, Routes, Navigate, useLocation, Outlet
} from 'react-router-dom'
import { Paper } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from 'theme'
import { useSelector } from 'react-redux'
import './App.css'
import AuthContext from 'contexts/authContext'
import Navbar from 'component/navbar/Navbar'
import Header from 'component/header'
import routes from 'router/routes'
import ViewA from 'view/ViewA'
import ViewB from 'view/ViewB'
import Login from 'view/auth/login'
import Register from 'view/auth/register'

function ProtectedRoutes() {
  const ctx = useContext(AuthContext)
  const location = useLocation()
  const isAuth = ctx?.isLoggedIn

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}

function RouterPage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        {routes.map(cur => (
          cur?.list.map((cur2, index2) => (
            (cur2?.to) ? (<Route key={cur2.to} exact path={cur2.to} element={cur2.view} />) : (
              cur2?.subLink?.map((cur3, index3) => (
                <Route key={cur3.to} exact path={cur3.to} element={cur3.view} />
              ))
            )
          ))
        ))}
        <Route path="*" element={<ViewA />} />
      </Route>
    </Routes>
  )
}

function App() {
  const ctx = useContext(AuthContext)
  const isAuth = ctx?.isLoggedIn
  const { mode, mainColor } = useSelector(state => state.setting)

  const theme = useMemo(() => createTheme({
    mainColor,
    mode,
  }), [mainColor, mode])

  return (
    <ThemeProvider theme={theme}>
      <Paper className="App">
        <Router>
          {(isAuth) && (<Navbar />)}
          <Header />
          <div style={{
            marginLeft: (isAuth) ? '280px' : 0,
            paddingTop: (isAuth) ? '85px' : 0,
            minHeight: '100vh',
            width: (isAuth) ? 'calc(100% - 280px)' : '100%',
            backgroundColor: theme?.palette?.background?.default,
          }}
          >
            <RouterPage />
          </div>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}

export default App
