import React from 'react'
import { useHistory } from 'react-router'
import { loginUser, initialLoginState } from '../lib/api'
import { setToken } from '../lib/auth'


function Login(){

  const history = useHistory()

  const [formData, setFormData] = React.useState(initialLoginState)
  const [isError, setIsError] = React.useState(false)


  const handleChange = (event) =>{
    setFormData({...formData, [event.target.name] : event.target.value})
    setIsError(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await loginUser(formData)
      setToken(response.data.token)
      history.push('/dogs')
    } catch (error) {
      setIsError(true)
    }
  }


  return (
    <section className="section full-height">
    <div className="container">
      <div className="columns">
        <form className="column is-half is-offset-one-quarter box"
        onSubmit={handleSubmit}>
          <div className="field">
            <label className="label"> Email</label>
            <div className="control">
              <input
                className="input"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label"> Password</label>
            <div className="control">
              <input
                className="input"
                placeholder="Enter your password"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </div>
          </div>
          {isError && 
              <p className="has-text-centered">
                Oops! Incorrect login details</p>}
          <div className="field">
            <button type="submit" className="button is-fullwidth">Log in </button>
          </div>
        </form>

      </div>

    </div>

  </section>
  )


}

export default Login 