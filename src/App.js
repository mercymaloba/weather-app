import { IconButton, Paper, InputBase, Divider } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import {useCallback, useEffect } from "react";

function App(city) {

const apiKey = process.env.REACT_APP_API_KEY;
 console.log('API Key:', apiKey);


const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


const fetchData = useCallback((city) => {
fetch(url)
 .then(response=>response.json())
 
 .then(data => console.log(data))
 
 .catch(error=>console.log(error));
}, [ url])
useEffect(()=>{
  fetchData(city);

}, [fetchData, city]);

  return (
    <>
      <div>
        <h1>Welcome to the Weather App!</h1>
      </div>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter city"
          inputProps={{ "aria-label": "enter city" }}
        />
        
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search"  onClick={fetchData}>
          <SearchIcon/>
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </>
  );
}

export default App;
