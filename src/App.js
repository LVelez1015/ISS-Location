import './App.css';
import { useState, useEffect } from 'react';

const URL1 = 'https://api.wheretheiss.at/v1/satellites/25544';
let tempURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function App() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [inputLat, setInputLat] = useState(''); //for when user inputs a lat and long for testing
  const [inputLong, setInputLong] = useState('');

  const [country, setCountry] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchLatLong = async () => {
      const result = await fetch(URL1);
      const json = await result.json();
      setLat(json.latitude);
      setLong(json.longitude);
      setDataLoaded(true);
    };

    fetchLatLong();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  useEffect(() => {
    if (dataLoaded) {
      const fetchDataWithCoords = async () => {
        const URL2 = `${tempURL}${lat},${long}&key=${googleMapsApiKey}`;
        console.log(URL2);
        const result = await fetch(URL2);
        const json = await result.json();
        
        var tempCountry = "." //when country = '.', then the ISS is not over a country
        
        let parts = json.results[0].address_components;
        parts.forEach(element => {
          if(element.types.includes("country"))
          {
            tempCountry = element.long_name;

          }

        });

        setCountry(tempCountry);
        
        console.log(json);
      };

      fetchDataWithCoords();
    }
  }, [lat, long, dataLoaded]); // Runs when lat, long, or dataLoaded change
  
  const handleLatChange = (e) => setInputLat(e.target.value);  
  const handleLongChange = (e) => setInputLong(e.target.value);
 
  const handleApplyCoordinates = () => {  
    setLat(parseFloat(inputLat));  
    setLong(parseFloat(inputLong));  
  };

  return (
    <div className="App">
      <header className="App-header">
        
        <div> 
          Latitude: {lat}<br />
          Longitude: {long}<br />
          
          {country === '' ? (
            <p>Loading country information...</p>
          ) : country === '.' ? (
            <p>Country information is not available.</p>
          ) : country ? (
            <p>Country: {country}</p>
          ) : null}  {/* This handles the case where country might be an empty string or null */}

          

         {/*FOR DEBUGGING: allowing user to plug in lat and long */}
            <label for="lat">Latitude: </label>
            <input type="number" id="lat"  value={inputLat} onChange={handleLatChange}/>
            <label for="long"> <br /> Longitude: </label>
            <input type="number" id="long" value={inputLong} onChange={handleLongChange}/>

          <br />
          <button onClick={handleApplyCoordinates}>Apply Coordinates</button>

        </div>
          
        <div className='App-box'>
        <p> <b>Cities and Countries for Testing:</b><br /></p>
        <p align="left" style={{ fontSize: '20px' }}>           
          Paris, France : 48.864716, 2.349014 <br />
          Seattle, Washington : 47.608013, -122.335167 <br />
          Beijing, China :  39.9045, 116.391 <br />
          Cape Town, South Africa: -33.918861, 18.423300 <br />
        </p>
      </div>

{/* 
      <div style={{display: 'inline-block', border: '1px solid #CCC', borderRadius: '6px', position: 'relative', overflow: 'hidden', width: '310px', height: '450px'}}>
  <iframe src='https://spotthestation.nasa.gov/widget/widget2.cfm' width='310' height='450' frameborder='0'></iframe>
</div> */}


      </header>
    </div>
    
  );
}

export default App;
