import React from 'react'
import ReactDOM from 'react-dom'
import NoiseMap from './pages/NoiseMapPage/NoiseMap.js'
import registerServiceWorker from './registerServiceWorker'

import './scss/General.scss'

ReactDOM.render(<NoiseMap />, document.getElementById('root'))
registerServiceWorker()
