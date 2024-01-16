import "./index.css"
import {Link} from "react-router-dom"

const GamingVideoDetail = (props)=>{
    const {eachGame} = props
    const {id,title,viewCount,thumbnailUrl} = eachGame


    return(
        <Link to = {`/videos/${id}`} key = {id} className="w-1/2 p-6 flex-col justify-start items-start sm:w-1/3">
            <img src = {thumbnailUrl} alt = "thumbnail" className="w-full h-72"/>
            <div className="flex-col justify-start items-start mt-2">
                <p className="text-xs font-semibold">{title}</p>
                <p className="text-xs">{viewCount} Watching Worldwide</p>  
            </div>

        </Link>

    )
}

export default GamingVideoDetail