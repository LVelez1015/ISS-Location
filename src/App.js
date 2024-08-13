import './App.css';
import { useState, useEffect } from 'react';

const URL = 'https://api.wheretheiss.at/v1/satellites/25544';

function App() {

  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL)
      result.json().then(json => {
        //console.log(json)
        
        setLat(json.latitude);
        setLong(json.longitude);
        
      })
    }
    fetchData();
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <p> 
        Latitude: {lat}<br />
        Longitude: {long}<br />
        </p>
        <a>
        </a>
      </header>
    </div>
  );
}

export default App;
