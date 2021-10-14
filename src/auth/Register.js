import React from 'react'
import { useHistory } from 'react-router'
import { registerUser, initialState } from '../lib/api'



function Register(){
  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value })
    setFormErrors({ ...formErrors, [event.target.name]: '' })
  }

  const handleSubmit =  async (event) => {
    event.preventDefault()
    try {
      await registerUser(formData)
      history.push('/login')
    } catch (error) {
      setFormErrors(error.response.data)
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
              {formErrors.username && 
              (<p className="error-text">{formErrors.username}</p>)}
                <input
                  className={`input ${formErrors.username ? 'is-danger' : ''}`}
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label"> Email</label>
              <div className="control">
              {formErrors.email && 
              (<p className="error-text">{formErrors.email}</p>)}
                <input
                  className={`input ${formErrors.email ? 'is-danger' : ''}`}
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
              {formErrors.password && 
              (<p className="error-text">{formErrors.password}</p>)}
                <input
                  className={`input ${formErrors.password ? 'is-danger' : ''}`}
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
              {formErrors.passwordConfirmation && 
              (<p className="error-text">{formErrors.passwordConfirmation}</p>)}
                <input
                  className={`input ${formErrors.passwordConfirmation ? 'is-danger' : ''}`}
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