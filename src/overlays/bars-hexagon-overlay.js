import React, { Component } from 'react'
import DeckGL from 'deck.gl'
import { HexagonLayer } from 'deck.gl'

const elevationScale = { min: 1, max: 50 }

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
]

export default class BarsOverlay extends Component {

  constructor(props) {
    super(props)
    this.startAnimationTimer = null
    this.intervalTimer = null
    this.state = {
      elevationScale: elevationScale.min
    }

    this.startAnimate = this.startAnimate.bind(this)
    this.animateHeight = this.animateHeight.bind(this)
  }

  componentDidMount() {
  this.animate()
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== this.props.data.length) {
      this.animate();
    }
  }

  componentWillUnmount() {
    this.stopAnimate()
  }

  animate() {
    this.stopAnimate()

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this.startAnimate, 1500)
  }

  startAnimate() {
    this.intervalTimer = window.setInterval(this.animateHeight, 20)
  }

  stopAnimate() {
    window.clearTimeout(this.startAnimationTimer)
    window.clearTimeout(this.intervalTimer)
  }

  animateHeight() {
    if (this.state.elevationScale === elevationScale.max) {
      this.stopAnimate();
    } else {
      this.setState({elevationScale: this.state.elevationScale + 1})
    }
  }

  render() {
    const {viewport, data, radius, coverage, upperPercentile} = this.props;

    if (!data) {
      return null
    }

    const layers = [
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        coverage,
        data,
        elevationRange: [0, 3000],
        elevationScale: this.state.elevationScale,
        extruded: true,
        getPosition: d => d,
        lightSettings: LIGHT_SETTINGS,
        onHover: this.props.onHover,
        opacity: 1,
        pickable: Boolean(this.props.onHover),
        radius,
        upperPercentile
      })
    ]

    return <DeckGL {...viewport} layers={layers} />;
  }
}





  // renderBarsLayer(bars_data) {
  //   return [
  //     new ScreenGridLayer({
  //       id: 'bars-grid-layer',
  //       data: bars_data,
  //       minColor: [0, 0, 0, 0],
  //       unitWidth: 10,
  //       unitHeight: 10,
  //     })
  //   ]
  // }
  //
  // render() {
  //   return (
  //     <DeckGL
  //       id="default-deckgl-overlay"
  //       width={width}
  //       height={height}
  //       debug
  //       {...mapViewState}
  //       onWebGLInitialized={param.onWebGLInitialized}
  //       layers={renderBarsLayer(bars)}
  //       effects={param.effects}
  //     />
  //   )
  // }
