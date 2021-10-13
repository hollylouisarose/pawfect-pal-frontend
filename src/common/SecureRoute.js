import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function SecureRoute({ component: Component, ...rest }) {
  if (isAuthenticated()) {
    return <Route {...rest} component={Component} />
  }
  removeToken()
  return <Redirect to="/login" />
}

export default SecureRoute