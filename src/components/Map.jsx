import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet';

const Map = ({ data, center }) => {

    const customMarkerIcon = L.icon({
        iconUrl: '/icon-location.svg',
        iconSize: [35, 41], 
        iconAnchor: [12, 41],
        popupAnchor: [0, -41] 
    });

    const MapUpdater = ({ center }) => {
        const map = useMap();
        useEffect(() => {
          map.setView(center, map.getZoom());
        }, [center, map]);
        return null;
      };
  return (
    <MapContainer 
        center={center} 
        zoom={10} 
        className='map'
    >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data && data.latitude && data.longitude && (
          <Marker position={[data.latitude, data.longitude]} icon={customMarkerIcon}>
            <Popup>
              {`${data.city}, ${data.state_prov}, ${data.country_name}`}
            </Popup>
          </Marker>
        )}
        <MapUpdater center={center} />
    </MapContainer>
  )
}

export default Map