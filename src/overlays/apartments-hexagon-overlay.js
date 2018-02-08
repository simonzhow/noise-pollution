/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import DeckGL from 'deck.gl'
import { HexagonLayer } from 'deck.gl'

const COLOR_RANGE = [
  [241,238,246],
  [208,209,230],
  [166,189,219],
  [116,169,207],
  [43,140,190],
  [4,90,141]
]

const LIGHT_SETTINGS = {
  lightsPosition: [20.144528, 20.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.9,
  diffuseRatio: 0.5,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

export default class ApartmentsHexagonOverlay extends Component {
  render2DModel() {
    const { data, viewport } = this.props

    const layer = new HexagonLayer({
      id: 'bars-hexagon-layer',
      extruded: false,
      colorDomain: [0, 50],
      lightSettings: LIGHT_SETTINGS,
      colorRange: COLOR_RANGE,
      data,
      radius: 20,
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
      colorDomain: [0, 50],
      lightSettings: LIGHT_SETTINGS,
      colorRange: COLOR_RANGE,
      data,
      radius: 20,
      pickable: true,
      onHover: this.props.hoverInfo
    })

    return (<DeckGL {...viewport} layers={[layer]} />)
  }


  render() {
    return (
      this.props.mode ? this.render3DModel() : this.render2DModel()
    )
  }
}
