import React from 'react'
import '../../scss/fa/font-awesome.scss'
import './button.scss'

export default function HomeButton() {
  return (
    <div className="home-button" onClick={this.props.home}>
      <i className='fa fa-home fa-2x' />
    </div>
  )
}
