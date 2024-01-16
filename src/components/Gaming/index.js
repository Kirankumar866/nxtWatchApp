import "./index.css"
import {Component} from "react"
import { SiYoutubegaming } from "react-icons/si";
import {Link} from "react-router-dom"
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import GamingVideoDetail from "../GamingVideoDetail"

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

class Gaming extends Component{

    state = {gamingVideoData: [],apiStatus: apiStatusConstants.initial}

    gamingHeader = ()=>(
        <div className="flex justify-start items-center pl-12 bg-neutral-200 p-2">
                <div className="w-16 h-16 bg-slate-300 rounded-full bg-center flex justify-center items-center mr-2">
                <SiYoutubegaming className="w-10 h-10 text-red-600"/>
                </div>
            <h2 className="font-bold">Gaming</h2>
            </div>
    )

    componentDidMount(){
        this.getGamingVideos()
    }
    getFormattedVideoData = data => ({
        id: data.id,
        thumbnailUrl: data.thumbnail_url,
        title: data.title,
        viewCount: data.view_count,
      })

    getGamingVideos = async () => {
    
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = "https://apis.ccbp.in/videos/gaming"
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
            gamingVideoData: updatedVideoData,
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
          <Link to="/gaming">
            <button type="button" className="bg-violet-500 rounded-lg p-2 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
              Try Again
            </button>
          </Link>
        </div>
      )

      renderingGamingView = ()=>{
        const {gamingVideoData} = this.state

        return(
            <ul className="flex flex-wrap pt-3 flex-grow justify-start items-start">
                {gamingVideoData.map((eachGame=><GamingVideoDetail  eachGame = {eachGame} />))}
            </ul>
        )

      }

      renderingGamingResult = ()=>{
        const {apiStatus} = this.state
    
        switch (apiStatus) {
          case apiStatusConstants.success:
            return this.renderingGamingView()
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

            <div>
                {this.gamingHeader()}
                {this.renderingGamingResult()}

            </div>
    
    
    
        )

    }
    
}

export default Gaming