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
  bearing: -5.396674584323023
}


export default class PartiesMap extends Component {
  constructor() {
    super()
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      barsData: null
    }

    this.handleResize = this.handleResize.bind(this)
    this.updateBars = this.updateBars.bind(this)

    // load in bars data
    Papa.parse(BARS_DATA, {
      download: true,
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      complete: this.updateBars
    })
  }

  updateBars(results) {
    const barsData = results.data.map(item => {
      return [item.Longitude, item.Latitude]
    })

    this.setState ({ barsData: barsData })
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

  renderMap() {

    // trivial case to render the bars
    const { viewport, barsData } = this.state

    return (
      <MapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={ MAPBOX_TOKEN }
      >
        <BarsOverlay viewport={ viewport } data={ barsData || [] } />
      </MapGL>
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
          <HomeButton home={this.handleResize}/>
        </div>
      </div>
    )
  }
}
