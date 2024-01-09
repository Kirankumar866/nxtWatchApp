import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import ThemeContext from './Context/ThemeContext'

import Login from './components/Login'
import Home from "./components/Home"

// Replace your code here
class App extends Component {
  state = {lightMode: true}

  toggleThemeMode = () => {
    this.setState(prevstate => ({
      lightMode: !prevstate.lightMode,
    }))
  }

  render() {
    const {lightMode} = this.state

    return (
      <ThemeContext.Provider
        value={{
          lightMode,
          toggleThemeMode: this.toggleThemeMode,
        }}
      >
        
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
