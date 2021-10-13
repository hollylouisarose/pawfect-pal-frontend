import React from 'react'
import { useHistory } from 'react-router'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'

function Login(){

  const history = useHistory()

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })


  const handleChange = (event) =>{
    setFormData({...formData, [event.target.name] : event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await loginUser(formData)
      setToken(response.data.token)
      history.push('/dogs')
    } catch (error) {
      console.log(error)
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