import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Papa from 'papaparse'
import BarsHexagonOverlay from '../../overlays/bars-hexagon-overlay.js'
import ApartmentsHexagonOverlay from '../../overlays/apartments-hexagon-overlay.js'
import Selection from '../../components/Selection'
import Button from '../../components/Button'
import InfoMenu from '../../components/InfoMenu'
import SlideOutPanel from '../../components/SlideOutPanel'
import ToggleSwitch from '../../components/ToggleSwitch'

import { MAPBOX_TOKEN, MAPBOX_STYLE_MARKERS, MAPBOX_STYLE_NO_MARKERS, BARS_DATA, APARTMENTS_DATA, MAPBOX_GEO } from '../../constants'
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
      is3dMode: false, // change later
      showBarsOverlay: false, // change later
      showApartmentsOverlay: false,
      showMarkers: false,
      showMenu: false,

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
    this.handleResize()
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
    this.setState({ viewport: DEFAULT_VIEWPORT })
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu })
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

  toggleMapMarkers() {
    this.setState({
      showMarkers: !this.state.showMarkers
    })
  }

  changeDimensionMode() {
    this.setState({ is3dMode: !this.state.is3dMode })
  }

  onHoverTooltip({x, y, lngLat, object}) {
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

  renderMapAndOverlays() {
    const {
      viewport,
      is3dMode,
      bars,
      showBarsOverlay,
      apartments,
      showApartmentsOverlay,
      showMarkers
    } = this.state

    const inactiveStyle = {
      visibility: 'hidden'
    }

    return (
      <MapGL
        {...viewport}
        onViewportChange={this.onViewportChange.bind(this)}
        mapStyle={ showMarkers ?  MAPBOX_STYLE_MARKERS : MAPBOX_STYLE_NO_MARKERS }
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
      is3dMode,
      showMenu
    } = this.state

    return (
      <div className="parties-map">
        { this.renderTooltip() }
        { this.renderMapAndOverlays() }


        {/* Renders info menu, selection box, toggle switch, and home/info buttons */}
        <div className="menu-container">
          <SlideOutPanel isOpen={showMenu}>
            <InfoMenu />
          </SlideOutPanel>
        </div>

        <div className="selection-container">
          <Selection
            toggleMarkers={this.toggleMapMarkers.bind(this)}
            checkedBars={showBarsOverlay}
            toggleBars={this.toggleBarsOverlay.bind(this)}
            checkedApartments={showApartmentsOverlay}
            toggleApartments={ this.toggleApartmentsOverlay.bind(this) }
          />
        </div>

        <div className="toggle-switch-container">
          { (showBarsOverlay || showApartmentsOverlay) && <ToggleSwitch mode={is3dMode} changeMode={this.changeDimensionMode.bind(this)}/> }
        </div>

        <div className="home-button-container">
          <Button
            type={'fa fa-home fa-2x'}
            didClick={this.homeButtonPressed.bind(this)}
          />
        </div>

        <div className="info-button-container">
          <Button
            type={'fa fa-info-circle fa-2x'}
            didClick={this.toggleMenu.bind(this)}
          />
        </div>
      </div>
    )
  }
}
