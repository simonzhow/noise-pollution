import React, { Component } from 'react'
import '../../scss/fa/font-awesome.scss'
import './button.scss'
import PropTypes from 'prop-types'

export default class Button extends Component {
  render() {
    return (
      <div className="button" onClick={this.props.didClick}>
        <i className={this.props.type} />
      </div>
    )
  }
}

Button.propTypes = {
  didClick: PropTypes.func,
  type: PropTypes.string
}
