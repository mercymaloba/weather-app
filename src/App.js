import { IconButton, Paper, InputBase, Divider } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const inputRef = useRef()

  const apiKey = process.env.REACT_APP_API_KEY;
  console.log("API Key:", apiKey);

  
    
    const fetchData = async (city) => {
      if (city===" ") {
        setError(new Error("Please enter a valid city name"));
        return;
      }
  
      setLoading(true);
      setError(null);
      
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
          
        }
        console.log(data);
        setData(data);
      } catch (error) {
        setError(null);
        setData(null);
      } finally {
        setLoading(false);
        setCity("");
      }
    };

    useEffect(() => {
      
    fetchData("mumbai");
  }, []);

 

  // const fetchData = useCallback((city) => {
  // fetch(url)
  //  .then(response=>response.json())

  //  .then(data => console.log(data))

  //  .catch(error=>console.log(error));
  // }, [ url])
  // useEffect(()=>{
  //   fetchData(city);

  // }, [fetchData, city]);

  return (
    <>
      <div>
        <h1>Welcome to the Weather App!</h1>
      </div>
      {loading && <h2>Loading...</h2>}
      {error && <h2>Error: {error.message}</h2>}
      {data && (
        <div>
          <h2>Weather in {data.name}</h2>
          <p>Weather: {data.weather[0].description}</p>
          <p>Temperature: {Math.floor(data.main.temp)}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
      )}

      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }} onSubmit={(e) => e.preventDefault()}

      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter city"
          inputProps={{ "aria-label": "enter city" }}
          value={city}
          inputRef={inputRef}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
                fetchData(inputRef.current.value);
  
            }}
        />

        <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={()=>fetchData(inputRef.current.value)}>
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </>
  );
}

export default App;
