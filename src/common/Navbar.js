import { Link } from 'react-router-dom'

function Navbar(){

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
          <Link to="/">Home</Link>
          </div>
          <div className="navbar-item">
          <Link to="/dogs">See all Dogs</Link>
          </div>
          <div className="navbar-item">
          <Link to="/register">Sign up</Link>
          </div>
          <div className="navbar-item">
          <Link to="/login">Log in</Link>
          </div>
        </div>
      </div> 
    </nav>

  )


}

export default Navbar