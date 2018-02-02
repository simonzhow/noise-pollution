import React from 'react'
import ReactDOM from 'react-dom'
import PartiesMap from './pages/PartiesMapPage/PartiesMap.js'
import registerServiceWorker from './registerServiceWorker'

import './scss/General.scss'

ReactDOM.render(<PartiesMap />, document.getElementById('root'))
registerServiceWorker()
