import React from 'react'
import '../../scss/fa/font-awesome.scss'
import './infoMenu.scss'

import { INFO_DESCRIPTION } from '../../constants'


export default function InfoMenu() {
  return (
    <div className="info-menu">
      <div className="info-menu-title">Data Visualization of New York Noise Complaints</div>
      <div className="info-menu-body">
        { INFO_DESCRIPTION }
      </div>
      <div className="info-menu-footer">
        <span>Data taken from <a target="_blank" rel="noopener noreferrer" href="https://www.kaggle.com/somesnm/partynyc">Kaggle</a></span>
        <div className="social-icons">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/simonzhow/Summer-Internship-Project-Simon"><i className={'fa fa-github fa-2x'}/></a>
        </div>
      </div>
    </div>
  )
}
