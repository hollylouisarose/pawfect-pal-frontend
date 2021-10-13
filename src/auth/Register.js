import React from 'react'
import { useHistory } from 'react-router'
import { registerUser } from '../lib/api'

function Register(){
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit =  async (event) => {
    event.preventDefault()
    try {
      const response = await registerUser(formData)
      console.log(response)
      history.push('/login')
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
              <label className="label"> Username</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
            </div>
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
              <label className="label"> Password confirmation</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Confirm your password"
                  name="passwordConfirmation"
                  type="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth">Sign up</button>
            </div>
          </form>

        </div>

      </div>

    </section>
  )


}

export default Register