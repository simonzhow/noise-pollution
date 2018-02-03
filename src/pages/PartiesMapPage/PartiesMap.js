import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import Selection from '../../components/Selection'
import HomeButton from '../../components/Button'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN } from '../../constants' // , MapMode, BARS_DATA, PARTIES_DATA


import './PartiesMap.scss'

const DEFAULT_LONGITUDE = -73.985130
const DEFAULT_LATITUDE = 40.718896

export default class PartiesMap extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        longitude: DEFAULT_LONGITUDE,
        latitude: DEFAULT_LATITUDE,
        zoom: 12,
        minZoom: 5,
        maxZoom: 15,
        pitch: 30.5,
        bearing: -5.396674584323023
      }
    }

    this.handleResize = this.handleResize.bind(this)
    this.homeButtonPressed = this.homeButtonPressed.bind(this)
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    // if component not in the DOM, we do not need a resize handler
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    const newViewport = this.state.viewport
    newViewport.width = window.innerWidth
    newViewport.height = window.innerHeight
    this.setState({ viewport: newViewport })
  }

  homeButtonPressed() {
    console.log('clicked!')
    // const currViewport = this.state.viewport
    // currViewport.longitude = DEFAULT_LONGITUDE
    // currViewport.latitude = DEFAULT_LATITUDE
    // this.setState({ viewport: currViewport })
  }


  renderMap() {
    const { viewport } = this.state

    return (
      <MapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={ MAPBOX_TOKEN }
      />
    )
  }

  render() {

    // const {
    //   viewport,
    //   data
    // } = this.state

    return (
      <div className="parties-map">
        { this.renderMap() }
        <div className="selection-container">
          <Selection />
        </div>
        <div className="home-button-container">
          <HomeButton home={this.homeButtonPressed}/>
        </div>
        {/* <div className="overlay-container">
          <BarsOverlay viewport={ viewport } data={ data || [] } />
        </div> */}
      </div>
    )
  }
}
