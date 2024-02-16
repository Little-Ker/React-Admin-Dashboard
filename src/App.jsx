import React, { useContext } from 'react'
import {
  BrowserRouter as Router, Route, Routes, Navigate, useLocation, Outlet
} from 'react-router-dom'
import './App.css'
import AuthContext from 'contexts/authContext'
import Navbar from 'component/navbar/Navbar'
import Header from 'component/header'
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
        <Route exact path="/dashboard" element={<ViewA />} />
        <Route exact path="viewA" element={<ViewA />} />
        <Route exact path="viewB" element={<ViewB />} />
        <Route path="*" element={<ViewA />} />
      </Route>
    </Routes>
  )
}

function App() {
  const ctx = useContext(AuthContext)
  const isAuth = ctx?.isLoggedIn

  return (
    <div className="App">
      <Router>
        {(isAuth) && (<Navbar />)}
        <Header />
        <div style={{ marginLeft: (isAuth) ? '300px' : 0, marginTop: (isAuth) ? '100px' : 0 }}>
          <RouterPage />
        </div>

      </Router>
    </div>
  )
}

export default App
