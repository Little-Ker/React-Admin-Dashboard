import React, { useContext } from 'react'
import {
  BrowserRouter as Router, Route, Routes, Navigate, useLocation, Outlet
} from 'react-router-dom'
import './App.css'
import AuthContext from 'contexts/authContext'
import Navbar from 'component/navbar/Navbar'
import ViewA from 'view/ViewA'
import ViewB from 'view/ViewB'
import Login from 'view/auth/login'

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
      <Route element={<ProtectedRoutes />}>
        <Route exact path="/" element={<ViewA />} />
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
        <RouterPage />
      </Router>
    </div>
  )
}

export default App
