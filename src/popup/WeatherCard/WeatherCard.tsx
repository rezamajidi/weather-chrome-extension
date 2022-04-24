import React, { useEffect } from 'react';
import { fetchOpenWeatherData } from '../../utils/api'

const WeatherCard: React.FC<{
  city: string
}> = ({ city }) => {
  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  },[city])
  return (
    <h1>{city}</h1>
  )
}

export default WeatherCard