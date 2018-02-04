import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import BarsHexagonOverlay from '../../overlays/bars-hexagon-overlay.js'
import ApartmentsHexagonOverlay from '../../overlays/apartments-hexagon-overlay.js'
import Selection from '../../components/Selection'
import HomeButton from '../../components/Button'
import ToggleSwitch from '../../components/ToggleSwitch'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, BARS_DATA, APARTMENTS_DATA } from '../../constants'

import Papa from 'papaparse'
import './NoiseMap.scss'

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


export default class NoiseMap extends Component {
  constructor() {
    super()
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      bars: {
        barsData: null,
        numCalls: null
      },
      apartments: {
        apartmentsData: null
      },
      is3dMode: false,
      showBarsOverlay: false,
      showApartmentsOverlay: false
    }

    this.handleResize = this.handleResize.bind(this)
    this.updateBars = this.updateBars.bind(this)
    this.updateApartments = this.updateApartments.bind(this)
    this.homeButtonPressed = this.homeButtonPressed.bind(this)
    this.changeDimensionMode = this.changeDimensionMode.bind(this)
    this.toggleBarsOverlay = this.toggleBarsOverlay.bind(this)
    this.toggleApartmentsOverlay = this.toggleApartmentsOverlay.bind(this)

    // load in bars data
    Papa.parse(BARS_DATA, {
      download: true,
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      complete: this.updateBars
    })

    // load in party data
    Papa.parse(APARTMENTS_DATA, {
      download: true,
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      complete: this.updateApartments
    })

    /* TODO:
    1. CSS show/hide instead of re rendering overlays
    3. hamburger menu for extra information?
    4. add hovering functionality
    5. mobile friendly pls
    */

    // MUST RESET TOGGLE WHENEVER MODE IS SWITCHED
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

  updateApartments(results) {
    const apartmentsData = results.data.map(entry => {
      return {position: [entry.Longitude, entry.Latitude]}
    })

    const apartmentsEntry = {
      apartmentsData: apartmentsData
    }

    this.setState({ apartments: apartmentsEntry })
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

  toggleBarsOverlay() {
    this.setState({
      showBarsOverlay: !this.state.showBarsOverlay,
      showApartmentsOverlay: this.state.showApartmentsOverlay ? !this.state.showApartmentsOverlay : this.state.showApartmentsOverlay
    })
  }

  toggleApartmentsOverlay() {
    this.setState({
      showApartmentsOverlay: !this.state.showApartmentsOverlay,
      showBarsOverlay: this.state.showBarsOverlay ? !this.state.showBarsOverlay : this.state.showBarsOverlay
    })
  }

  changeDimensionMode() {
    this.setState({ is3dMode: !this.state.is3dMode })
  }

  renderMap() {
    const {
      viewport,
      bars,
      apartments,
      is3dMode,
    } = this.state

    return (
      <MapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={ MAPBOX_TOKEN }
      >
        {/*css show marker instead of rendering*/}
        { this.state.showBarsOverlay && <BarsHexagonOverlay mode={is3dMode} viewport={ viewport } data={ bars.barsData || [] } /> }
        { this.state.showApartmentsOverlay && <ApartmentsHexagonOverlay mode={is3dMode} viewport={ viewport } data={ apartments.apartmentsData || [] } /> }
      </MapGL>
    )
  }

  render() {

    const {
      showBarsOverlay,
      showApartmentsOverlay,
      is3dMode
    } = this.state

    return (
      <div className="parties-map">
        { this.renderMap() }
        <div className="selection-container">
          <Selection checkedBars={showBarsOverlay} toggleBars={this.toggleBarsOverlay} checkedApartments={showApartmentsOverlay} toggleApartments={ this.toggleApartmentsOverlay }/>
        </div>

        <div className="toggle-switch-container">
          { (showBarsOverlay || showApartmentsOverlay) && <ToggleSwitch mode={is3dMode} changeMode={this.changeDimensionMode}/> }
        </div>

        <div className="home-button-container">
          <HomeButton home={this.homeButtonPressed}/>
        </div>
      </div>
    )
  }
}
