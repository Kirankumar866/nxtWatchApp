import "./index.css"
import {Route} from "react-router-dom"
import SideBar from "../SideBar"
import Header from "../Header"


const ProtectedRoute = (props)=>{
    return(
        <div className = "flex justify-start items-start WholeContainer">
            <SideBar className = "sidebarContainer"/>
            <div className = "HomePageContainer">
                <Header />
                <Route {...props} />
            </div>
        </div>
    )

}

export default ProtectedRoute 
