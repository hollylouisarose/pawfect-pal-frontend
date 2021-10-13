import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import Navbar from './common/Navbar'
import Home from './common/Home'
import SecureRoute from './common/SecureRoute'
import DogShow from './components/dogs/DogShow'
import DogIndex from './components/dogs/DogIndex'
import AddDog from './components/dogs/AddDog'
import EditDog from './components/dogs/EditDog'
import Register from './auth/Register'
import Login from './auth/Login'
import DogFavourite from './components/dogs/DogFavourite'
import Footer from './common/Footer'


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <SecureRoute path="/dogs/new">
        <AddDog/>
      </SecureRoute>
      <SecureRoute path="/dogs/:dogId/edit">
        <EditDog />
      </SecureRoute>
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
      <SecureRoute path="/favourites">
        <DogFavourite />
      </SecureRoute>
    </Switch>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
