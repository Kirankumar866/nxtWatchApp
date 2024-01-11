import React, { Component } from 'react';
import Cookies from 'js-cookie'
import {Link} from "react-router-dom"
import "./index.css"
import {ThreeDots} from 'react-loader-spinner'

import { IoCloseCircleOutline } from 'react-icons/io5';
import PlayerContainer from '../PlayerContainer';

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

class HomeVideoSection extends Component {
  state = { close: false, searchInput: '',apiStatus: apiStatusConstants.initial, videoData: []};

  componentDidMount(){
    this.getVideos()
  }

  getFormattedVideoData = data => ({
    channel: {name: data.channel.name,profileImageUrl : data.channel.profile_image_url},
    id: data.id,
    publishedAt: data.published_at,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    viewCount: data.view_count,
  })

  getVideos = async () => {
    const {searchInput} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        videoData: updatedVideoData,
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



  
  


  onCloseBanner = () => {
    this.setState({ close: true });
  };

  bannerDisplay = () => {
    const { close } = this.state;
    const visibility = close ? 'hidden' : '';

    return (
      <div className={`bg-[url("https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png")] w-full h-40 p-4 bg-cover flex justify-between items-start ${visibility}`}>
        <div className="flex-col justify-start items-start w-1/2">
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" className="w-18 h-11 pb-2" alt="website logo" />
          <p className="pb-2 sm:text-sm">Buy Nxt Watch Premium prepaid plans with UPI</p>
          <button type="button" className="border-2 bg-transparent border-gray-500 mb-2 text-sm p-1">
            GET IT NOW
          </button>
        </div>
        <button type="button" className="bg-transparent" onClick={this.onCloseBanner}>
          <IoCloseCircleOutline className="w-6 h-6" />
        </button>
      </div>
    );
  };

  

  onChangingInput = e => {
    
    
    this.setState({searchInput: e.target.value})
  }
  onClickingSearch = (e)=>{
    if(e.key === "Enter"){
        this.getVideos()
    }
  }

  renderSearch = () => (
    <input
      type="search"
      placeholder=" Search"
      className="inputElement w-1/2"
      onChange={this.onChangingInput}
      onKeyDown = {this.onClickingSearch}
      
    />
  )

  renderingVideosView = ()=>{
    const {videoData} = this.state
    

    return(
        <ul className='w-full flex-wrap p-1 sm:flex justify-start items-start md:flex justify-start items-start'>
            {videoData.map((eachVideo)=><PlayerContainer eachvideo = {eachVideo} />)}
        </ul>

    )
  }

  renderingHomeResult = ()=>{
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }


  

  render() {
    return <>
    {this.bannerDisplay()}
    <div className = "pt-2 pl-2 w-full">
    {this.renderSearch()}
    {this.renderingHomeResult()}
    

    </div>
    
    </>;
  }
}

export default HomeVideoSection;
