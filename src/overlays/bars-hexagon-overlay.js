/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import DeckGL from 'deck.gl'
import { HexagonLayer } from 'deck.gl'

// play around with lights
const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.7,
  diffuseRatio: 0.5,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

// play around with colors later
// make manhattan more red

// const colorRange = [
//   [253,208,162],
//   [253,208,162],
//   [253,174,107],
//   [166,54,3],
//   [166,54,3],
//   [166,54,3]
// ]

// const elevationScale = {min: 1, max: 50}

export default class BarsHexagonOverlay extends Component {
  render2DModel() {
    const { data, viewport } = this.props

    const layer = new HexagonLayer({
      id: 'bars-hexagon-layer',
      extruded: false,
      lightSettings: LIGHT_SETTINGS,
      data,
      radius: 40,
      pickable: true,
      onHover: this.props.hoverInfo
    })

    return (<DeckGL {...viewport} layers={[layer]} />)
  }

  render3DModel() {
    const { data, viewport } = this.props

    const layer = new HexagonLayer({
      id: 'bars-hexagon-layer',
      elevationRange: [10, 3000],
      elevationScale: 1,
      extruded: true,
      lightSettings: LIGHT_SETTINGS,
      // colorRange,
      data,
      radius: 40,
      pickable: true,
      onHover: this.props.hoverInfo
    })

    return (
      <DeckGL
        {...viewport}
        layers={[layer]}
      />)
  }


  render() {
    return (
      this.props.mode ? this.render3DModel() : this.render2DModel()
    )
  }
}
