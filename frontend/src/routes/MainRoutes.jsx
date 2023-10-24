import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import Login from '../components/Login'
import Signup from '../components/Signup'
import History from '../components/History'
import PrivateRoute from './PrivateRoute'
import Translate from '../components/Translate'
import Consize from '../components/Consize'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/history' element={<PrivateRoute><History /></PrivateRoute>}></Route>
        <Route path='/translate' element={<PrivateRoute><Translate /></PrivateRoute>}></Route>
        <Route path='/consize' element={<PrivateRoute><Consize /></PrivateRoute>}></Route>
           
        </Routes>
    </div>
  )
}

export default MainRoutes