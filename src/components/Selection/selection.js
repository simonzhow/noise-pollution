import React, { Component } from 'react'
import './selection.scss'
import PropTypes from 'prop-types'

export default class Selection extends Component {
  render() {
    return (
      <div className="overlay-map-control">
        <div className="title-label">Mode Selection</div>
        <div className="selection">
          <input type="checkbox" onChange={this.props.toggleBars} checked={this.props.checkedBars}/> <span>Club/Bar Noise Complaints</span>
        </div>
        <div className="selection">
          <input type="checkbox" onChange={this.props.toggleApartments} checked={this.props.checkedApartments}/> <span>Apartment Noise Complaints</span>
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
  checkedApartments: PropTypes.bool
}
