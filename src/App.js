import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import Navbar from './common/Navbar'
import Home from './common/Home'
import DogShow from './components/dogs/DogShow'
import DogIndex from './components/dogs/DogIndex'
import Register from './auth/Register'
import Login from './auth/Login'
import DogFavourite from './components/dogs/DogFavourite'


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/dogs/:dogId">
        <DogShow />
      </Route>
      <Route path="/dogs">
        <DogIndex/>
      </Route>
      <Route path="/register">
          <Register />
        </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/favourites">
        <DogFavourite />
      </Route>
    </Switch>
    </BrowserRouter>
  )
}

export default App
