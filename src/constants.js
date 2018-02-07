export const MapMode = {
  NONE:             'NONE',
  BARS:            'CLUB/BARS/RESTAURANT',
  PARTIES:       'PARTIES',
}

// uses rawgit for online csv
export const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2ltb256aG91IiwiYSI6ImNqZDVrNWhtZDR1ajEyeW5za202aTdzbnYifQ.eK4hOuvmBZoPcbXFIt_XoQ'
export const BARS_DATA = 'https://rawgit.com/simonzhow/Summer-Internship-Project-Simon/master/src/data/bar_locations.csv'
export const APARTMENTS_DATA = 'https://raw.githubusercontent.com/simonzhow/Summer-Internship-Project-Simon/master/src/data/party_in_nyc.csv'

// mapbox api

export const MAPBOX_GEO = {
  urlInit: 'https://api.mapbox.com/geocoding/v5/',
  mode: 'mapbox.places/',
  type: '&types=neighborhood&types=poi'
}

export const INFO_DESCRIPTION = 'Noise pollution is one of the primary characteristics of both New York City and its bordering regions. That being said, this web application serves to provide a preliminary data visualization of noise complaints filed in 2016 taken from the NYPD.'
