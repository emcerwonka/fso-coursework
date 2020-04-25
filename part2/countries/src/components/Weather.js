import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState()
  const [resolved, setResolved] = useState(false)

  const api_key = process.env.REACT_APP_WEATHERSTACK_KEY
  const query_url = 'http://api.weatherstack.com/current'
  const params = {
    access_key : api_key,
    query : country.capital + ', ' + country.name
  }

  useEffect(() => {
    axios
      .get(query_url, {params})
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
        console.log(weather)
        setResolved(true);
      })
  }, [])

  
  if (!resolved) {
    return <p>Loading weather...</p>
  } else {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature : {weather.current.temperature}C</p>
        <img
          src={weather.current.weather_icons[0]}
          stye={{ width: 50, height: 50 }}
          alt={weather.current.weather_descriptions}
        />
        <p>{weather.current.weather_descriptions}</p>
      </div>
    )
  }
}

export default Weather