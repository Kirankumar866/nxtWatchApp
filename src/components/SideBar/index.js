import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import ThemeContext from '../../Context/ThemeContext';
import "./index.css"
import { MdHome,MdOutlinePlaylistAdd,MdLocalFireDepartment} from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";

const SideBar = ()=>
<ThemeContext.Consumer>
    {value=>{
        const {lightMode} = value
        const imageUrl = lightMode ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png": "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
        const bgsidebar = lightMode ? "#f9f9f9" : "#1e293b"
        const textColor = lightMode ? "light" :"dark"

return(
    <Sidebar className={`sticky left-0 sidebar-card ${textColor}`} backgroundColor= {bgsidebar} height="100vh">
        <img src = {imageUrl}  alt = "website logo" className = "w-1/2 flex justify-center items-center ml-4 pt-2" />
<Menu
menuItemStyles={{
  button: {
    // the active class will be added automatically by react router
    // so we can use it to style the active menu item
    [`&.active`]: {
      backgroundColor: '#13395e',
      color: {textColor},
    },
  },
}}
>
<MenuItem  icon = {<MdHome />} component={<Link to="/" />}> Home</MenuItem>
<MenuItem icon = {<MdLocalFireDepartment />} component={<Link to="/trending" />}> Trending</MenuItem>
<MenuItem icon = {<SiYoutubegaming />} component={<Link to="/gaming" />}> Gaming</MenuItem>
<MenuItem icon = {<MdOutlinePlaylistAdd />} component={<Link to="/saved" />}> Saved</MenuItem>
</Menu>
<div className='mt-32'>
<h3 className = "p-1">Contact Us</h3>
<div className = "flex justify-start items-center p-2 ">
    <img src = "https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" className = "w-9 h-9 mr-2 hover:animate-bounce cursor-pointer" alt = "facebook logo" />
    <img src = "https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" className = "w-9 h-9 mr-2 hover:animate-bounce cursor-pointer" alt = "twitter logo" />
    <img src = "https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" className = "w-9 h-9 mr-2 hover:animate-bounce cursor-pointer" alt = "linked logo" />
</div>
<p className = "text-sm m-1">Enjoy ! Now to see your channels and recommendations</p>

</div>

</Sidebar>

)
        
    }}
</ThemeContext.Consumer>
    



export default SideBar
