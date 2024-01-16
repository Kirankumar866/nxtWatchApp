import "./index.css"
import {Component} from 'react'
import {Link} from "react-router-dom"
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import VideoDetails from "../VideoDetails"

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

class VideoItemDetails extends Component{

    state = {videoDetails: [],apiStatus: apiStatusConstants.initial,}

    componentDidMount(){
        this.getVideoDetails()
    }

    getFormattedVideoData = data => ({
        channel: {name: data.channel.name,profileImageUrl : data.channel.profile_image_url,subscriberCount: data.channel.subscriber_count},
        id: data.id,
        videoUrl: data.video_url,
        publishedAt: data.published_at,
        thumbnailUrl: data.thumbnail_url,
        title: data.title,
        viewCount: data.view_count,
        description: data.description,
        
      })

    getVideoDetails = async () => {

        const {match} = this.props
        const {params} = match
        const {id} = params 
        

    
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })

        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `https://apis.ccbp.in/videos/${id}`
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        if (response.ok) {
          const fetchedData = await response.json()
          
          const updatedVideoData = this.getFormattedVideoData(fetchedData.video_details)
          console.log(updatedVideoData)
          this.setState({
            videoDetails: updatedVideoData,
            apiStatus: apiStatusConstants.success,
          })
        }
        if (response.status === 404) {
          this.setState({
            apiStatus: apiStatusConstants.failure,
          })
        }
      }
    
      renderLoadingView = () => (
        <div className="products-details-loader-container" data-testid="loader">
          <ThreeDots
      visible={true}
      height="50"
      width="50"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
        </div>
      )
    
      renderFailureView = () => (
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

      renderingVideoItemView = ()=>{
        const {videoDetails} = this.state

          return(
            <ul className="flex justify-start items-start w-full">
                <VideoDetails videoDetails = {videoDetails} />
            </ul>

          )
      }

      renderingVideoItemResult = ()=>{
        const {apiStatus} = this.state
    
        switch (apiStatus) {
          case apiStatusConstants.success:
            return this.renderingVideoItemView()
          case apiStatusConstants.failure:
            return this.renderFailureView()
          case apiStatusConstants.inProgress:
            return this.renderLoadingView()
          default:
            return null
        }
      }



    render(){
        return(
            <>
            {this.renderingVideoItemResult()}
            </>


        )
    }

}

export default VideoItemDetails