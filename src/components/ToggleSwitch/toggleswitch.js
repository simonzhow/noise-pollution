import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './toggleswitch.scss'

export default class ToggleSwitch extends Component {
  render() {
    return (
      <div className="toggle-switch">
        <label className="switch">
          <input onChange={this.props.changeMode} type="checkbox" />
          <span className="slider" />
        </label>
      </div>
    )
  }
}

ToggleSwitch.propTypes = {
  changeMode: PropTypes.func
}
