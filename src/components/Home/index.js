import "./index.css"
import SideBar from "../SideBar"
import Header from "../Header"
import HomeVideoSection from "../HomeVideoSection"

const Home = ()=>{
    return(
        <div className = "flex justify-start items-start WholeContainer">
            <SideBar className = "sidebarContainer"/>
            <div className = "HomePageContainer">
                <Header />
                <HomeVideoSection />
            </div>
        </div>
    )

}

export default Home 
