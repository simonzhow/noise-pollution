import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import Selection from '../../components/Selection'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN } from '../../constants' // , MapMode, BARS_DATA, PARTIES_DATA


import './PartiesMap.scss'

export default class PartiesMap extends Component {
  constructor() {
    super()
    this.state = {
      width: 400,
      height: 400,
      viewport: {
        longitude: -73.985130,
        latitude: 40.718896,
        zoom: 12
      }
    }

    this.handleResize = this.handleResize.bind(this)
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
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  renderMap() {
    const {
      viewport,
      width,
      height
     } = this.state

    return (
      <MapGL
        {...viewport}
        width={width}
        height={height}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={ MAPBOX_TOKEN }
      />
    )
  }

  render() {

    return (
      <div className="parties-map">
        { this.renderMap() }
        <div className="selection-container">
          <Selection />
        </div>

        {/* <div className="parties-overlay">


        </div> */}
      </div>
    )
  }
}
