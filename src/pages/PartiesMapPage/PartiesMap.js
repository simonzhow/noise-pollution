import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import BarsOverlay from '../../overlays/bars-hexagon-overlay.js'
import Selection from '../../components/Selection'
import HomeButton from '../../components/Button'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, BARS_DATA } from '../../constants' // , MapMode, BARS_DATA, PARTIES_DATA

import Papa from 'papaparse'
import './PartiesMap.scss'

const DEFAULT_VIEWPORT = {
  width: window.innerWidth,
  height: window.innerHeight,
  longitude: -73.985130,
  latitude: 40.718896,
  zoom: 12,
  minZoom: 5,
  maxZoom: 15,
  pitch: 30.5,
  bearing: -10.396674584323023
}


export default class PartiesMap extends Component {
  constructor() {
    super()
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      bars: {
        barsData: null,
        numCalls: null
      }

    }

    this.handleResize = this.handleResize.bind(this)
    this.updateBars = this.updateBars.bind(this)
    this.homeButtonPressed = this.homeButtonPressed.bind(this)

    // load in bars data
    Papa.parse(BARS_DATA, {
      download: true,
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      complete: this.updateBars
    })

    // load in party data

    /* TODO:
    1. make options for both bars and party
    2. allow user to choose between 2D and 3D viewing
    3. hamburger menu for extra information?
    4. add hovering functionality
    */
  }

  updateBars(results) {
    const barsData = results.data.map(entry => {
      return {position: [entry.Longitude, entry.Latitude]}
    })

    const numCalls = results.data.map(entry => {
      return [entry.num_calls]
    })

    const barsEntry = {
      barsData: barsData,
      numCalls: numCalls
    }

    this.setState({ bars: barsEntry })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize() // this will ensure that viewport adjusts to right size when mounted onto the DOM
  }

  componentWillUnmount() {
    // if component not in the DOM, we do not need a resize handler
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({
      viewport: DEFAULT_VIEWPORT
    })
  }

  homeButtonPressed() {
    const homeViewport = this.state.viewport
    homeViewport.longitude = DEFAULT_VIEWPORT.longitude
    homeViewport.latitude = DEFAULT_VIEWPORT.latitude
    this.setState({ viewport: homeViewport })
  }

  renderMap() {

    // trivial case to render the bars
    const { viewport, bars } = this.state

    return (
      <MapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={ MAPBOX_TOKEN }
      >
        <BarsOverlay viewport={ viewport } data={ bars.barsData || [] } />
      </MapGL>
    )
  }

  render() {
    return (
      <div className="parties-map">
        { this.renderMap() }
        <div className="selection-container">
          <Selection />
        </div>
        <div className="home-button-container">
          <HomeButton home={this.homeButtonPressed}/>
        </div>
      </div>
    )
  }
}
