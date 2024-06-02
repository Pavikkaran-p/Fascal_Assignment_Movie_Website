import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from './components/Home.jsx'
import MovieInfo from './components/MovieInfo.jsx'

const App = () => {
  return (
    <Routes>
        <Route path={'/login' } element={<Login/>}/>
        <Route path={'/signup'} element={<Signup/>} />
        <Route path={'/'} element={<Home/>} />
        <Route path={'/movie/:title'} element={<MovieInfo/>}/>
    </Routes>
  )
}

export default App