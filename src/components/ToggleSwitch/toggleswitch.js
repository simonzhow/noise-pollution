import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './toggleswitch.scss'

export default class ToggleSwitch extends Component {
  render() {
    const {
      changeMode,
      mode
    } = this.props


    return (
      <div className="toggle-switch">
        <label className="switch">
          <input checked={mode} onChange={changeMode} type="checkbox" />
          <span className="slider" />
        </label>
      </div>
    )
  }
}

ToggleSwitch.propTypes = {
  changeMode: PropTypes.func,
  mode: PropTypes.bool
}
