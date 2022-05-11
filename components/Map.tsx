import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useRef, useMemo, useCallback } from 'react'
import icon from './img/marker.svg'

const MarkerIcon = L.icon({
	iconUrl: icon.src,
    iconSize: new L.Point(40, 40),
})
const center = {lat: 46.34930769543271, lng: 48.03102157887105};

function DraggableMarker({lat, lng, onChange} : {lat: number, lng: number, onChange: any}) {

	const [draggable, setDraggable] = useState(false)
	const [position, setPosition] = useState({lat: lat, lng: lng});

	const markerRef = useRef<L.Marker>(null);

	const eventHandlers = useMemo(
	  () => ({
		dragend() {
		  const marker = markerRef.current
		  if (marker != null) {
			setPosition(marker.getLatLng())
			onChange({latitude: marker.getLatLng().lat, longitude: marker.getLatLng().lng})
		  }
		},
	  }),
	  [onChange],
	)
	const toggleDraggable = useCallback(() => {
	  setDraggable((d) => !d)
	}, [])
  
	return (
	  <Marker
		draggable={draggable}
		icon = {MarkerIcon}
		eventHandlers={eventHandlers}
		position={position}
		ref={markerRef}>
		<Popup minWidth={90} >
		  <span onClick={toggleDraggable}>
			{draggable
			  ? '🔓 Маркер можно переносить'
			  : '🔒 Нажмите для переноса маркера'}
		  </span>
		</Popup>
	  </Marker>
	)
  }

const Map = ({lat, lng, onChange} : {lat: number, lng: number, onChange: any}) => {
  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{height: 500, width: "100%"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker lat={lat} lng = {lng} onChange = {onChange}/>
    </MapContainer>
  )
}

export default Map
