import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Info from './components/Info';
import Map from './components/Map';
import 'leaflet/dist/leaflet.css';
import './styles.css';

const KEY = '610169f491f74c5ea256fc24eb09ca2c';

function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [center, setCenter] = useState([34.05430, -118.08212]);
  const mapRef = useRef()

  useEffect(() => {
    async function fetchData(ip) {
      try {
        const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${KEY}&ip=${ip}`);
        setData(response.data);
        setCenter([response.data.latitude, response.data.longitude]);
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
      setCenter([response.data.latitude, response.data.longitude]);
      setError('');

      if (mapRef.current) {
        mapRef.current.setView([response.data.latitude, response.data.longitude], 10);
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className='container'>
      <div className='search'>
        <h1 className='title'>IP Address Tracker</h1>
        <Form 
          handleSearch={handleSearch} 
          error={error} 
          input={input} 
          setInput={setInput}
          setError={setError}
        />
      </div>
      {data && <Info data={data} />}
      <Map data={data} center={center} />
    </div>
  );
}

export default App;
