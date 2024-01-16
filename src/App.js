import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import ThemeContext from './Context/ThemeContext'
import SaveContext from './Context/SaveContext'
import Login from './components/Login'
import HomeVideoSection from './components/HomeVideoSection'
import ProtectedRoute from "./components/ProtectedRoute"
import Trending from "./components/Trending"
import Saved from "./components/Saved"
import Gaming from "./components/Gaming"
import VideoItemDetails from "./components/VideoItemDetails"

// Replace your code here
class App extends Component {
  state = {lightMode: true,savedVideoList: []}

  toggleThemeMode = () => {
    this.setState(prevstate => ({
      lightMode: !prevstate.lightMode,
    }))
  }

  addSaveVideo=(videoDetails)=>{
    this.setState(prev=>({savedVideoList : [...prev.savedVideoList,videoDetails]}))
  }

  

  render() {
    const {lightMode,savedVideoList} = this.state
    

    return (
      <ThemeContext.Provider
        value={{
          lightMode,
          toggleThemeMode: this.toggleThemeMode,
        }}
      >
        <SaveContext.Provider 
          value = {{
            savedVideoList,
            addSaveVideo: this.addSaveVideo

          }}>
            <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={HomeVideoSection} />
          <ProtectedRoute exact path = "/trending" component = {Trending} />
          <ProtectedRoute exact path = "/gaming" component = {Gaming} />
          <ProtectedRoute exact path = "/saved" component = {Saved} />
          <ProtectedRoute exact path = "/videos/:id" component = {VideoItemDetails} />
        </Switch>

          </SaveContext.Provider>
        
        
      </ThemeContext.Provider>
    )
  }
}

export default App
