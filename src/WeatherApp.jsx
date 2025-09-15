import Search from "./SearchBox";
import "./WeatherApp.css";
import InfoCard from "./InfoCard";
import { useState } from "react";
export default function WeatherApp() {
  const [weatherInfo, setweatherInfo] = useState({
    city: "pune",
    description: "overcast clouds",
    temp: 23.56,
    temp_max: 23.56,
    temp_min: 23.56,
    pressure: 1011,
    humidity: 89,
  });

  const updateInfo=(result)=>{
    setweatherInfo(result);
  }

  return (
    <div className="weatherContainer">
      <h1>Weather App</h1>
      <Search  updateInfo={updateInfo}/>
      <InfoCard weatherInfo={weatherInfo}/>
    </div>
  );
}
