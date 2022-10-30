import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {

  const [weather, setWeather] = useState({});


  const [isCelsius, setIsCelsius] = useState (true);
  
 
  

  useEffect (() => {
    

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
   
    const success = pos => {
     
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b6d6d898b8a845fe7ded56300bfe5802
      `)
        .then(res => setWeather(res.data)); 
      
    }
   
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    } 
    navigator.geolocation.getCurrentPosition(success,error,options); 
  }, [])



 
  
console.log(weather)



  return (
    <div className="App">
      <div className='weather-container'>
        <h1> Weather App</h1>

        <div className='temp-info'>
          <img src= {`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" className='icon' />
          <div> 
            <h3>{weather.weather?.[0].description} </h3>
        
            <h3>
               {isCelsius ? (weather.main?.temp - 273.15).toFixed(2) : ((1.8 * (weather.main?.temp - 273.15)) + 32).toFixed(2) }
                {" "} {isCelsius ? "ºC" : "ºF" }
            </h3>
          </div>
        </div>

        <p> <i class="fa-solid fa-location-dot"></i> {weather.name}, {weather.sys?.country}</p>
        <p> <i class="fa-solid fa-droplet"></i> Humidity: {weather.main?.humidity}%</p>
        <p> <i class="fa-solid fa-wind"></i> Wind speed: {weather.wind?.speed} m/s</p>
        <button onClick={()=> setIsCelsius(!isCelsius)}> Change ºC / ºF </button>
        
      </div>
    </div>
  )
}

export default App
