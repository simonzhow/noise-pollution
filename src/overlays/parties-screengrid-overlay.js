import React from 'react'
import DeckGL from 'deck.gl'
import { ScreenGridLayer } from 'deck.gl'

export function renderBarsOverlay(param) {
  const { mapViewState, bars} = param.props
  const { width, height } = param.state

  return (
    <DeckGL
      id="default-deckgl-overlay"
      width={width}
      height={height}
      debug
      {...mapViewState}
      onWebGLInitialized={param.onWebGLInitialized}
      layers={renderBarsLayer(bars)}
      effects={param.effects}
    />
  )
}

function renderBarsLayer(bars_data) {
  return [
    new ScreenGridLayer({
      id: 'bars-grid-layer',
      data: bars_data,
      minColor: [0, 0, 0, 0],
      unitWidth: 10,
      unitHeight: 10,
    })
  ]
}
