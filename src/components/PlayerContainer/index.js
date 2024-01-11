import "./index.css"
import {Link} from "react-router-dom"
import {formatDistanceToNow} from 'date-fns'

const PlayerContainer = (props)=>{
    
    const {eachvideo} = props
    const {id,title,thumbnailUrl,channel,viewCount,publishedAt} = eachvideo
    
    let published = formatDistanceToNow(new Date(publishedAt)).match(/\d+/)
    const numberOfYears = published ? published[0] : null;
    console.log(numberOfYears)
    const {name,profileImageUrl} = channel

    return(
        <Link to = {`/videos/${id}`} key = {id} className = "shrink w-full flex-col justify-start items-start sm:w-1/2 md:w-1/3 p-1" >
            <img src={thumbnailUrl}className = "sm: w-full " alt='Thumbnail' />
            <div className="flex justify-start ">
                <img src = {profileImageUrl} alt = "profile" className="w-10 h-10 mr-1" />
                <div className = "flex-col justify-start items-start">
                <h2 className="text-sm">{title}</h2>
                <p>{name}</p>
                <div className="flex justify-start">
                    <p className="text-sm mr-1">{viewCount}views</p>
                    {numberOfYears && (
                        <li className="text-sm">{`${numberOfYears} years ago`}</li>
                    )}

                </div>

                </div>
                
            </div>
        </Link>
    )
}

export default PlayerContainer