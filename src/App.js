
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position){
      setLat(position.coords.latitude);
      setLong(position.coords.latitude);
    });
    console.log("Latitude is:", lat)
    console.log("Longitude is", long)

  }, [lat, long])
  return (
    <div className="App">
      weather app
    </div>
  );
}

export default App;
