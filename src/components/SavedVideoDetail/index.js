import "./index.css"
import {formatDistanceToNow} from 'date-fns'
import {Link} from "react-router-dom"

const SavedVideoDetail =(props)=>{
    const {eachVideo} = props
    
    const {id,title,thumbnailUrl,channel,viewCount,publishedAt} = eachVideo
    const {name,profileImageUrl} = channel
 
    
    let publishing = formatDistanceToNow(new Date(publishedAt)).match(/\d+/)

    const numberOfYear = publishing ? publishing[0] : null;

    

    return(
        <Link to = {`/videos/${id}`} key={id} className="w-full p-4 flex justify-start items-start">
    <img src={thumbnailUrl} alt="thumbnail" className="w-1/2 mr-2" />
    <div className="flex justify-start items-start w-1/2">
      <div className="flex-col justify-start items-start pl-2 text-xs">
        <h4 className="font-semibold">{title}</h4>
        <div className="flex justify-start items-start sm:flex-col">
          <p className="text-sm pr-2">{name}</p>
          <div className="flex justify-start items-start pt-1">
            <p className="text-xs pr-2">{viewCount} views</p>
            {numberOfYear && (
              <li className="text-xs">{`${numberOfYear} years ago`}</li>
            )}
          </div>
        </div>
      </div>
    </div>
  
</Link>

        

    )


}

export default SavedVideoDetail