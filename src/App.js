import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import './styles.css';
import 'leaflet/dist/leaflet.css';

const center = [34.05430, -118.08212];
const KEY = '610169f491f74c5ea256fc24eb09ca2c';

function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  // const [center, setCenter] = useState([]);

  useEffect(() => {
    async function fetchData(ip) {
      try {
        const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${KEY}&ip=${ip}`);
        setData(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch data');
      }
    }
    fetchData('192.212.174.101');
  }, []);

  const isValidIP = (ip) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!isValidIP(input)) {
      setError('Invalid IP address');
      return;
    }
    try {
      const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${KEY}&ip=${input}`);
      setData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  const customMarkerIcon = L.icon({
    iconUrl: '/icon-location.svg',
    iconSize: [35, 41], 
    iconAnchor: [12, 41],
    popupAnchor: [0, -41] 
  });

  return (
    <div className='container'>
      <div className='search'>
        <h1 className='title'>IP Address Tracker</h1>
        <form className='form' onSubmit={handleSearch}>
          <input
            type='text'
            placeholder='Search for any IP address'
            className={`input ${error ? 'input-error' : ''}`}
            value={error ? error : input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => { setError(''); setInput(''); }}
          />
          <button className='btn' type='submit'></button>
        </form>
      </div>
      {data && 
        (<div className='info'>
          <div>
            <span>IP address</span>
            <strong>{data.ip}</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>{`${data.city}, ${data.state_prov}, ${data.country_name}`}</strong>
          </div>
          <div>
            <span>Timezone</span>
            <strong>{data.time_zone.name}</strong>
          </div>
          <div>
            <span>ISP</span>
            <strong>{data.isp}</strong>
          </div>
        </div>)
      }

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
      </MapContainer>
    </div>
  );
}

export default App;
