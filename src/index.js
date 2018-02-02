import React from 'react'
import ReactDOM from 'react-dom'
import PartiesMap from './pages/PartiesMapPage/PartiesMap.js'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<PartiesMap />, document.getElementById('root'))
registerServiceWorker()
