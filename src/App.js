import { IconButton, Paper, InputBase, Divider } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  console.log("API Key:", apiKey);

  
    
    const fetchData = async (city) => {
      if (!city || !city.trim()) {
        setError(new Error("Please enter a valid city name"));
        return;
      }
  
      setLoading(true);
      setError(null);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

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
          <p>Temperature: {Math.round(data.main.temp - 273.15)}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
        </div>
      )}

      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter city"
          inputProps={{ "aria-label": "enter city" }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </>
  );
}

export default App;
