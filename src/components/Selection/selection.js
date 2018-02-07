import React, { Component } from 'react'
import './selection.scss'
import PropTypes from 'prop-types'

export default class Selection extends Component {
  render() {
    return (
      <div className="overlay-map-control">
        <div className="title-label">Noise Complaints by Type</div>
        <div className="selection">
          <input type="checkbox" onChange={this.props.toggleBars} checked={this.props.checkedBars}/> <span>Club/Bar/Restaurant</span>
        </div>
        <div className="selection">
          <input type="checkbox" onChange={this.props.toggleApartments} checked={this.props.checkedApartments}/> <span>Apartments</span>
        </div>
        <div className="selection-optional">
          <input type="checkbox" onChange={this.props.toggleMarkers} /> <span>Show Markers (map will reload)</span>
        </div>
        <div className="notice">
          Shift + drag to rotate
        </div>
      </div>
    )
  }
}

Selection.propTypes = {
  toggleBars: PropTypes.func,
  toggleApartments: PropTypes.func,
  checkedBars: PropTypes.bool,
  checkedApartments: PropTypes.bool,
  toggleMarkers: PropTypes.func
}
