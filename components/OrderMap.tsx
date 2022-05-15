import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import icon from './img/marker.svg'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { Sku } from "@prisma/client"

const MarkerIcon = L.icon({
	iconUrl: icon.src,
    iconSize: new L.Point(40, 40),
})

const center = {lat: 46.34930769543271, lng: 48.03102157887105};

const Map = ({skus} : {skus: Sku[]}) => {
	return (
	  <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{height: 500, width: "100%"}}>
		<TileLayer
		  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		{skus.map(e => 
			e.latitude != null && e.longitude != null && 
			<Marker position={{lat: e.latitude, lng: e.longitude}} icon = {MarkerIcon}>
				<Popup>
					<span>{e.name}</span>
				</Popup>
			</Marker>
		)}
	  </MapContainer>
	)
  }
  
  export default Map
  