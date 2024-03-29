import "./index.css"
import ThemeContext from "../../Context/ThemeContext"
import { withRouter } from "react-router-dom";
import Cookies from 'js-cookie'
import { MdLightMode,MdNightlight} from "react-icons/md";
import {IoExitOutline } from "react-icons/io5";
import Menu from "../Menu"

const Header = (props)=>

<ThemeContext.Consumer>
    {value=>{
        const {lightMode,toggleThemeMode} = value
        const imageUrl = lightMode ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png": "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
        const onChangeTheme = ()=>toggleThemeMode()
        const mode = !lightMode ? <MdLightMode  className = "w-5 h-5"/> : <MdNightlight className = "w-5 h-5"/>
        const bgColor = !lightMode ? "bgcolorcss" : "" 
        const onLogout = () => {

            const {history} = props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

        return (
            <div className={`${bgColor} w-full flex justify-between items-start p-2 md:flex md:justify-end md:items-center h-14`}>
            <img src= {imageUrl} alt = "website logo"  className = "w-13 h-8 websitelogo "/>
            <div className="hidden md:flex justify-start items-center mr-5 ">
            <button type = "button" onClick = {onChangeTheme}>
                {mode}
            </button>
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="w-5 h-5 ml-2 mr-2"
            />
            <button type="button" className="w-7 h-5 bg-transparent border-blue" onClick = {onLogout}>
                Logout
            </button>
            </div>
            <div className="flex justify-end items-center self-end md:hidden">
            <button type = "button" onClick = {onChangeTheme}>
                {mode}
            </button>
            <Menu />
            <button type="button" className="w-7 h-5 bg-transparent border-blue align-middle" onClick = {onLogout}>
                <IoExitOutline className = "w-6 h-6"/>
            </button>
            </div>




            </div>
        )
    }}
</ThemeContext.Consumer>


export default withRouter(Header)
