import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function Navbar(){
  const isAuth = isAuthenticated()
  const {pathname } = useLocation()
  const history = useHistory()

  React.useEffect(() => {
  },[pathname] )

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  console.log(isAuth)

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
          <Link to="/">Home</Link>
          </div>
          <div className="navbar-item">
          <Link to="/dogs">See all dogs</Link>
          </div>
          <div className="navbar-item">
          <Link to="/map">Adopt a dog</Link>
          </div>
          {!isAuth && (
            <>
            <div className="navbar-item">
            <Link to="/register">Sign up</Link>
            </div>
            <div className="navbar-item">
            <Link to="/login">Log in</Link>
            </div>
            </>
          )}
          {isAuth && (
            <>
            <div className="navbar-item">
            <Link to="/favourites">Favourites 💗</Link>
            </div>
            <div className="navbar-item">
            <Link to="/dogs/new">Add a dog</Link>
            </div>
            <div className="navbar-item">
            <button 
            className="button"
            onClick={handleLogout}
            >
              Log Out</button>
            </div>
            </>
          )}
          
        </div>
      </div> 
    </nav>

  )


}

export default Navbar