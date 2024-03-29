import "./index.css"
import { Component } from "react"
import {Link} from "react-router-dom"
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import {MdLocalFireDepartment} from "react-icons/md"
import TrendingVideoDetail from "../TrendingVideoDetail"

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

class Trending extends Component{

    state = {TrendingVideoData: [],apiStatus: apiStatusConstants.initial}

    componentDidMount(){
        this.getTrendingVideos()
    }

    getFormattedVideoData = data => ({
        channel: {name: data.channel.name,profileImageUrl : data.channel.profile_image_url},
        id: data.id,
        publishedAt: data.published_at,
        thumbnailUrl: data.thumbnail_url,
        title: data.title,
        viewCount: data.view_count,
      })

    getTrendingVideos = async () => {
    
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = "https://apis.ccbp.in/videos/trending"
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        if (response.ok) {
          const fetchedData = await response.json()
          const updatedVideoData = fetchedData.videos.map((eachVideo)=>this.getFormattedVideoData(eachVideo))
          
          this.setState({
            TrendingVideoData: updatedVideoData,
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

    trendingHeader = ()=>(
        <div className="flex justify-start items-center pl-12 bg-neutral-200 p-2">
                <div className="w-16 h-16 bg-slate-300 rounded-full bg-center flex justify-center items-center mr-2">
                <MdLocalFireDepartment className="w-12 h-12 text-red"/>
                </div>
            <h2 className="font-bold">Trending</h2>
            </div>
    )

    renderingTrendingView = ()=>{
        const {TrendingVideoData} = this.state
        
        return (
            <ul className="w-full flex-col justify-start items-center">
                {TrendingVideoData.map((eachTrend=> <TrendingVideoDetail eachVideo = {eachTrend} />))}

            </ul>
        )

    }

    renderingTrendingResult = ()=>{
        const {apiStatus} = this.state
    
        switch (apiStatus) {
          case apiStatusConstants.success:
            return this.renderingTrendingView()
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
            <div >
                {this.trendingHeader()}
                {this.renderingTrendingResult()}
            </div>
    
        )

    }

    
}

export default Trending