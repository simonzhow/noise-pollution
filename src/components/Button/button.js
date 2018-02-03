import React, { Component } from 'react'
import '../../scss/fa/font-awesome.scss'
import './button.scss'
import PropTypes from 'prop-types'

export default class HomeButton extends Component {
  render() {
    return (
      <div className="home-button" onClick={this.props.home}>
        <i className='fa fa-home fa-2x' />
      </div>
    )
  }
}

HomeButton.propTypes = {
  home: PropTypes.func
}
