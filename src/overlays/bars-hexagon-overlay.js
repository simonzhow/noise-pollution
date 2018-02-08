/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import DeckGL from 'deck.gl'
import { HexagonLayer } from 'deck.gl'

const COLOR_RANGE = [
  [255,255,212],
  [254,227,145],
  [254,196,79],
  [254,153,41],
  [217,95,14],
  [153,52,4]
]

const LIGHT_SETTINGS = {
  lightsPosition: [20.144528, 20.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.7,
  diffuseRatio: 0.5,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

export default class BarsHexagonOverlay extends Component {
  render2DModel() {
    const { data, viewport } = this.props

    const layer = new HexagonLayer({
      id: 'bars-hexagon-layer',
      extruded: false,
      lightSettings: LIGHT_SETTINGS,
      colorRange: COLOR_RANGE,
      data,
      radius: 40,
      pickable: true,
      onHover: this.props.hoverInfo,
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
      colorRange: COLOR_RANGE,
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
