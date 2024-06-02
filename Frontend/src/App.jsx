import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from './components/Home.jsx'
import MovieInfo from './components/MovieInfo.jsx'
import SearchResult from './components/SearchResult.jsx'
import Header from './components/Header.jsx'
import Profile from './components/Profile.jsx'
import MovieList from './components/MovieList.jsx'

const App = () => {
  return (
    <>
    <div className=''>
    <Header/>
    <Routes>
        <Route path={'/login' } element={<Login/>}/>
        <Route path={'/signup'} element={<Signup/>} />
        <Route path={'/'} element={<Home/>} />
        <Route path="/s/:searchTerm" element={<SearchResult/>} />
        <Route path={'/movie/:imdbID'} element={<MovieInfo/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/movielist/:listId'} element={<MovieList/>}/>
    </Routes>
    </div>
    </>
  )
}

export default App