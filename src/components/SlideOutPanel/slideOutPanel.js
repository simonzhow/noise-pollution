/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import './slideOutPanel.scss'

export default class SlideOutPanel extends Component {
  render() {
    let panelClass = 'panel'
    const direction = 'slideUp'
    panelClass += ` ${direction}`
    panelClass += this.props.isOpen ? ' go' : ''

    return (
      <div className={panelClass}>
        {this.props.children}
      </div>
    )
  }
}
