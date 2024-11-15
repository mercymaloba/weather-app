import { IconButton, Paper, InputBase, Card, Stack } from "@mui/material";

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
    <Stack sx={{flexDirection:'column', alignItems:'center', justifyContent:'center',background: 'linear-gradient(45deg, #FE6B 30%, #FF8E53 90%)', height:'100vh', width: '100vw'}}>
      
        <h1>Welcome to the Weather App!</h1>
      
      {loading && <h2>Loading...</h2>}
      {error && <h2>Error: {error.message}</h2>}
      
<Stack spacing={2}>
  <Stack sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', width: "100%" }}>
  <Stack>
  
      <Card
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400,  flexDirection:"row", margin: "auto" }} onSubmit={(e) => e.preventDefault()}

      >
        <InputBase
          sx={{display: "flex", flexDirection:"row", margin: "auto"}}
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
        
      </Card>
      </Stack>
      <Stack sx={{justifyContent:"center", alignItems:"center"}}>
      {data && (
        <div>
          <h2>Weather in {data.name}</h2>
          <p>Weather: {data.weather[0].description}</p>
          <p>Temperature: {Math.floor(data.main.temp)}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
      )}
     </Stack>
      </Stack>
  </Stack>
    </Stack>
  );
}

export default App;
