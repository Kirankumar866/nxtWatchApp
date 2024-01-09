import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
import ThemeContext from '../../Context/ThemeContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => (
    <ThemeContext.Consumer>
      {value => {
        const {lightMode} = value
        const labeled = lightMode ? 'lightlabel' : 'darklabel'
        const {password, showPassword} = this.state

        return (
          <>
            <label className={`input-label ${labeled}`} htmlFor="password">
              PASSWORD
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="password-input-field"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderUsernameField = () => (
    <ThemeContext.Consumer>
      {value => {
        const {username} = this.state
        const {lightMode} = value
       
        const labeled = lightMode ? 'lightlabel' : 'darklabel'
        return (
          <>
            <label className={`input-label ${labeled}`} htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
            />
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  onChangeShowPassword = () => {
    this.setState(prevstate => ({showPassword: !prevstate.showPassword}))
  }

  renderShowPassword = () => (
    <ThemeContext.Consumer>
      {value => {
        const {showPassword} = this.state
        const {lightMode} = value
        const labeled = lightMode ? 'lightlabel' : 'darklabel'
        return (
          <>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={this.onChangeShowPassword}
              id="showPassword"
            />
            <label className={`input-label ${labeled}`} htmlFor="showPassword">
              Show Password
            </label>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightMode} = value
          const url = lightMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          const formBg = lightMode ? 'formbglight' : 'formbgdark'
          const wholebg = lightMode ? 'wholebglight' : 'wholebgdark'
          return (
            <div className={`login-form-container ${wholebg}`}>
              <form
                className={`form-container ${formBg}`}
                onSubmit={this.submitForm}
              >
                <img
                  src={url}
                  className="login-website-logo-desktop-img"
                  alt="website logo"
                />
                <div className="input-container">
                  {this.renderUsernameField()}
                </div>
                <div className="input-container">
                  {this.renderPasswordField()}
                </div>
                <div className="flex justify-start items-start pt-1">
                  {this.renderShowPassword()}
                </div>
                <button type="submit" className="login-button1">
                  Login
                </button>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
              </form>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
