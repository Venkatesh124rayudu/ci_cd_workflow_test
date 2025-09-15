import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBox.css";
import React, { useState } from "react";
export default function Search({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const api = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY || "DUMMY_KEY";

  let getWheather = async () => {
    try {
      let response = await fetch(
        `${api}?q=${city}&appid=${apiKey}&units=metric`
      );
       if (!response.ok) {
        throw new Error(`City not found: ${response.status}`);
      }
      let weatherData = await response.json();
      // console.log(weatherData);
      let result = {
        city: city,
        description: weatherData.weather[0].description,
        temp: weatherData.main.temp,
        temp_max: weatherData.main.temp_max,
        temp_min: weatherData.main.temp_min,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
      };
      console.log(result);
      updateInfo(result);
      setError(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(true); // Set error state
      throw err;
    }
  };

  let HandleChange = (e) => {
    let Newcity = e.target.value;

    setCity(Newcity);
  };

  const HandleSubmit = async(e) => {
    try {
      e.preventDefault();
     await getWheather();
      setCity("");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="search">
      <h3>Search City</h3>
      <form onSubmit={HandleSubmit}>
        <TextField
          id="city"
          label="city"
          variant="outlined"
          onChange={HandleChange}
          value={city}
          required
        />
        <br></br>
        <br></br>
        <Button variant="contained" type="submit" size="large">
          Search &nbsp;
          <SearchIcon />
        </Button>
        {error && <p style={{color :"red"}}>No such City Found</p>}
      </form>
    </div>
  );
}
