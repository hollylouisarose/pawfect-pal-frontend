import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { getAllCentres } from '../../lib/api'

function Map(){

  const [viewport, setViewport] = React.useState({
    latitude: 51.0,
    longitude: 0.0,
    zoom: 8,
  })


  const [locations, setLocations] = React.useState([])
  const [popup, setPopup] = React.useState(null)

  React.useEffect(() => {

    const getData = async () => {

      try {
        const response = await getAllCentres()
        setLocations(response.data)
      } catch (error) {
        
      }

    }

    getData()

  }, [])


  return (
    <>
    <section className="hero">
      <div className="hero-body white"> 
      <h2>Looking to adopt?</h2>
      <p>Use the map below to find a centre near you! 💗</p>
      </div>
    </section>
    <div className="map-container">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        height="100%"
        width="100%"
        mapStyle='mapbox://styles/mapbox/light-v10'
        {...viewport}
        onClick={() => setPopup(null)}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {locations.map(location => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            <span
              role="img"
              aria-label="map-marker"
              onClick={() => setPopup(location)}
            >
              {location.icon}
            </span>
          </Marker>
        ))}
        {popup &&
          <Popup
            closeOnClick={true}
            onClose={() => setPopup(null)}
            latitude={popup.latitude}
            longitude={popup.longitude}
          >
            <div>
              {popup.name}
              {locations.map(location => {
                if(popup.name === location.name){
                  return (
                    <a
                    href={location.website}
                    target="_blank" rel="noopener noreferrer"
                    className="map-link"
                    >Visit Website</a>
                  )
                }
              })}
              </div>
          </Popup>
        }
      </ReactMapGL>
    </div>
    </>
  )
    

}

export default Map