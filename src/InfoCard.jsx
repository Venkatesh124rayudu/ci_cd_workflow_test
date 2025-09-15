import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoCard.css";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import UmbrellaIcon from '@mui/icons-material/Umbrella';

export default function InfoCard({weatherInfo}) {
  const sunny="/sunny.jpeg";
  const rainy="/rainy.jpg";
  const winter="/winter.png";
  return (
    <div className="infoContainer">
      
      <Card sx={{ maxWidth: 445, marginTop:"10px" }}>
        <CardMedia sx={{ height: 140 }} image={weatherInfo.humidity > 80 ? rainy : weatherInfo.temp > 15 ? sunny : winter} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {weatherInfo.city} &nbsp; <span>{weatherInfo.humidity > 80 ? <UmbrellaIcon/> : weatherInfo.temp > 15 ? <SunnyIcon/> : <AcUnitIcon />} </span>
          </Typography>
          <p>Tempature : {weatherInfo.temp}&deg;C</p>
          <p>Minimum Tempature : {weatherInfo.temp_min}&deg;C</p>
          <p>Maximum Tempature : {weatherInfo.temp_max}&deg;C</p>
          <p>Pressure : {weatherInfo.pressure}</p>
          <p>Humidity : {weatherInfo.humidity}</p>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            The current weather feels like {weatherInfo.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
