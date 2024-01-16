import "./index.css"
import {Component} from 'react'
import ReactPlayer from "react-player"
import {formatDistanceToNow} from 'date-fns'
import { AiOutlineLike,AiOutlineDislike } from "react-icons/ai";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import SaveContext from "../../Context/SaveContext";

class VideoDetails extends Component{
    state = {isLiked:false,isDisliked: false}

    onClickLikeReaction = ()=>{
        const {isDisliked}  = this.state
        if(isDisliked){
            this.setState(prev=>({isLiked: !prev.isLiked, isDisliked: false}))

        }else{
            this.setState(prev=>({isLiked: !prev.isLiked}))
        }
        
    }

    onClickDisLikeReaction = ()=>{
        const {isLiked}  = this.state
        if(isLiked){
            this.setState(prev=>({isLiked: false, isDisliked: !prev.isDisliked}))

        }else{
            this.setState(prev=>({isDisliked: !prev.Disliked}))
        }
        
    }


    


    render(){
        const {videoDetails} = this.props
        const {isLiked,isDisliked}=this.state
        const {id,videoUrl,title,viewCount,publishedAt,channel,description} = videoDetails
        const {name,profileImageUrl,subscriberCount} = channel
        let published = formatDistanceToNow(new Date(publishedAt)).match(/\d+/)
        const numberOfYears = published ? published[0] : null;
        const liked = (isLiked) ? "actived": ""
        const disliked  = (isDisliked) ? "actived": ""
        
        return(
            <SaveContext.Consumer>
                {(context)=>(
                        <li key = {id} className="w-full">
                        <ReactPlayer url={videoUrl} width = "100%" controls muted/>
                        <div className="w-full p-3">
                            <p>{title}</p>
                            <div className="flex justify-start items-center pb-2">
                                <p className="text-xs pr-2">{viewCount} views</p>
                                {numberOfYears && (
                                    <li className="text-xs">{`${numberOfYears} years ago`}</li>
                                    )}
                            </div>
                            <div className = "flex justify-start items-center pb-2">
                                <button onClick= {this.onClickLikeReaction} className = {`flex justify-start mr-4 ${liked}`}>
                                <AiOutlineLike />
                                <p className="text-xs">Like</p>
                                </button>
                                <button onClick = {this.onClickDisLikeReaction} className = {`flex justify-start mr-4 ${disliked}`}>
                                <AiOutlineDislike />
                                <p className="text-xs">Dislike</p>
                                </button>
                                <button className = "flex justify-start mr-4" onClick={() => context.addSaveVideo(videoDetails)}>
                                <MdOutlinePlaylistAdd />
                                <p className="text-xs">Save</p>
                                </button>
                            </div>
                            <hr className="mb-3"/>
                            <div className="flex justify-start">
                                <img src = {profileImageUrl} alt = "profile" className="w-10 h-10 mr-1" />
                                <div className = "flex-col justify-start items-start">
                                <h2 className="text-sm pb-2 font-semibold">{name}</h2>
                                <p className="text-sm pb-2">{subscriberCount} subscribers</p>
                                <p className="text-sm pb-2">{description}</p>
                               </div>
                            </div>   
        
                        </div>
        
                    </li>
                    )}
    

            </SaveContext.Consumer>
            
            


        )
    }
}

export default VideoDetails