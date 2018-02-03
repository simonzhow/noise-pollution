import React from 'react'
import './selection.scss'

export default function Selection() {
  return (
    <div className="overlay-map-control">
      <div className="title-label">Mode Selection</div>
      <div className="selection">
        <input type="checkbox"/> <span>Bar Parties in New York</span>
      </div>
      <div className="selection">
        <input type="checkbox"/> <span>Apartment Parties in New York</span>
      </div>
      <div className="notice">
        Shift + drag to rotate
      </div>
    </div>
  )
}
