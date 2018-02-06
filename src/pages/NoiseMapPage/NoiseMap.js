import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Papa from 'papaparse'
import BarsHexagonOverlay from '../../overlays/bars-hexagon-overlay.js'
import ApartmentsHexagonOverlay from '../../overlays/apartments-hexagon-overlay.js'
import Selection from '../../components/Selection'
import HomeButton from '../../components/Button'
import ToggleSwitch from '../../components/ToggleSwitch'

import { MAPBOX_TOKEN, BARS_DATA, APARTMENTS_DATA, MAPBOX_GEO } from '../../constants'
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
      // overlays
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
      showApartmentsOverlay: false,

      // hover tooltip
      x: null,
      y: null,
      lngLat: null,
      hoveredObject: null,
      neighborhood: null,
      locProperties: {
        address: null,
        category: null
      }
    }

    this.handleResize = this.handleResize.bind(this)
    this.updateBars = this.updateBars.bind(this)
    this.updateApartments = this.updateApartments.bind(this)
    this.homeButtonPressed = this.homeButtonPressed.bind(this)
    this.changeDimensionMode = this.changeDimensionMode.bind(this)
    this.toggleBarsOverlay = this.toggleBarsOverlay.bind(this)
    this.toggleApartmentsOverlay = this.toggleApartmentsOverlay.bind(this)
    this.renderTooltip = this.renderTooltip.bind(this)

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
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
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

  onHoverTooltip({color, x, y, lngLat, object}) {
    this.setState({ x, y, lngLat: lngLat, hoveredObject: object })
  }

  renderTooltip() {
    const {
      x,
      y,
      lngLat,
      hoveredObject,
      neighborhood,
      locProperties,
      showBarsOverlay
    } = this.state

    if (!hoveredObject) {
      return null
    }

    const tooltipStyle = {
      position: 'absolute',
      padding: '4px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      maxWidth: '300px',
      fontSize: '10px',
      zIndex: 9,
      pointerEvents: 'none'
    }


    // Make a call to Mapbox API for reverse GEO
    const lonlat = lngLat[0].toString() + '%2C' + lngLat[1].toString() + '.json'
    const url = MAPBOX_GEO.urlInit + MAPBOX_GEO.mode + lonlat + '?access_token=' + MAPBOX_TOKEN + MAPBOX_GEO.type
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            // theoretically, poi should always be returned because all (long, lat) maps to a poi
            locProperties: (result.features[0]) && {
              ...result.features[0].properties
            },
            neighborhood: (result.features[1]) && result.features[1].text
          })
        },
        (error) => {
          console.log('ERROR: ', error)
        }
      )

    return (
      <div style={{...tooltipStyle, left: x, top: y}}>
        <div>{`elevation: ${hoveredObject.elevationValue}`}</div>
        {neighborhood && <div>{`neighborhood: ${neighborhood}`}</div>}
        {locProperties.address && <div>{`address: ${locProperties.address}`}</div>}
        {showBarsOverlay && <div>{`type: ${locProperties.category}`}</div>}
      </div>
    )
  }

  renderMap() {
    const {
      viewport,
      bars,
      apartments,
      is3dMode,
      showBarsOverlay,
      showApartmentsOverlay
    } = this.state

    const inactiveStyle = {
      visibility: 'hidden'
    }

    return (
      <MapGL
        {...viewport}
        onViewportChange={this.onViewportChange.bind(this)}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={ MAPBOX_TOKEN }
      >
        <div className="bars-overlay" style={!showBarsOverlay ? inactiveStyle : {}}>
          <BarsHexagonOverlay hoverInfo={this.onHoverTooltip.bind(this)} mode={is3dMode} viewport={ viewport } data={ bars.barsData || [] } />
        </div>

        {/* still need to decide whether to have it conditionally render or css property change */}
        <div className="apartments-overlay" style={!showApartmentsOverlay ? inactiveStyle : {}}>
          <ApartmentsHexagonOverlay hoverInfo={this.onHoverTooltip.bind(this)} mode={is3dMode} viewport={ viewport } data={ apartments.apartmentsData || [] } />
        </div>
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
        { this.renderTooltip() }
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
