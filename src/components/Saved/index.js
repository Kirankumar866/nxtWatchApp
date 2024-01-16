import "./index.css"
import {Link} from "react-router-dom"

import {MdLocalFireDepartment} from "react-icons/md"
import SavedVideoDetail from "../SavedVideoDetail"
import SaveContext from "../../Context/SaveContext"



const Saved =()=>{


    
      const renderNoSavedView = () => (
        <div className="product-details-error-view-container">
          <img
            alt="error view"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            className="error-view-image"
          />
          <h1 className="product-not-found-heading">Product Not Found</h1>
          <Link to="/">
            <button type="button" className="bg-red-400 rounded pl-2 pr-2 button">
              Try Again
            </button>
          </Link>
        </div>
      )

    const savedHeader = ()=>(
        <div className="flex justify-start items-center pl-12 bg-neutral-200 p-2">
                <div className="w-16 h-16 bg-slate-300 rounded-full bg-center flex justify-center items-center mr-2">
                <MdLocalFireDepartment className="w-12 h-12 text-red-600"/>
                </div>
            <h2 className="font-bold">Saved</h2>
            </div>
    )

    const renderingSavedView = (savedVideoList)=>{

        
        return (
            <ul className="w-full flex-col justify-start items-center">
                {savedVideoList.map((eachvideo=><SavedVideoDetail eachVideo = {eachvideo}/>))}

            </ul>
        )

    }

    return(
        <SaveContext.Consumer>
            {value=>{
                const {savedVideoList} = value

                console.log("saved list:", savedVideoList)
                



                return(
                    <>
                        {savedHeader()}
                        {savedVideoList.length>0?renderingSavedView(savedVideoList): renderNoSavedView()}

            
                    </>
                )
            }}

        </SaveContext.Consumer>
        

    )

}    

        

    

    


export default Saved