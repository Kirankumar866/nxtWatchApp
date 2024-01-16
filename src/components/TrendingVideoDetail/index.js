import "./index.css"
import {formatDistanceToNow} from 'date-fns'
import {Link} from "react-router-dom"

const TrendingVideoDetail =(props)=>{
    const {eachVideo} = props
    
    const {id,title,channel,thumbnailUrl,viewCount,publishedAt} = eachVideo
    const {name,profileImageUrl} = channel
    let published = formatDistanceToNow(new Date(publishedAt)).match(/\d+/)
    const numberOfYears = published ? published[0] : null;



    return(
        <Link to = {`/videos/${id}`} key={id} className="w-full flex-col p-4 justify-start items-center sm:flex sm:justify-start sm:items-start">
  <div className="sm:flex">
    <img src={thumbnailUrl} alt="thumbnail" className="w-full sm:w-1/2 mr-2" />
    <div className="flex justify-start items-start w-full sm:w-1/2">
      <img src={profileImageUrl} alt="profile" className="flex min-w-2 min-h-2 w-9 h-9 rounded-full sm:hidden" />
      <div className="flex-col justify-start items-start pl-2">
        <h4 className="font-semibold">{title}</h4>
        <div className="flex justify-start items-start sm:flex-col">
          <p className="text-sm pr-2">{name}</p>
          <div className="flex justify-start items-start">
            <p className="text-xs pr-2">{viewCount} views</p>
            {numberOfYears && (
              <li className="text-xs">{`${numberOfYears} years ago`}</li>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</Link>

        

    )


}

export default TrendingVideoDetail