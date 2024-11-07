import { IconButton, Paper, InputBase, Divider } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function App() {
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
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </>
  );
}

export default App;
