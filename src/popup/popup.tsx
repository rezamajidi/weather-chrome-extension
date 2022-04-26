import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import 'fontsource-roboto'
import './popup.css'
import WeatherCard from './WeatherCard/WeatherCard';
import { setStoredCities, setStoredOptions, getStoredCities, getStoredOptions, LocalStorageOptions } from '../utils/storage'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>('')
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  useEffect(() => {
    getStoredCities().then(cities => setCities(cities))
    getStoredOptions().then(options => setOptions(options))
  },[])
  const handleCityButtonClick = () => {
    if(cityInput === '') {
      return
    }
    const updateCities = [...cities, cityInput]
    setStoredCities(updateCities).then(() => {
      setCities(updateCities)
      setCityInput('')
    })
  }
  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index,1)
    const updateCities = [...cities]
    setStoredCities(updateCities).then(() => {
      setCities(updateCities)
    })
  }

  if(!options) {
    return null
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(event) => {
                  setCityInput(event.target.value)
                }}
              />
              <IconButton
                onClick={handleCityButtonClick}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {
        cities.map((city, index) => (
          <WeatherCard
            city={city}
            key={index}
            onDelete={() => handleCityDeleteButtonClick(index)}
          />
        ))
      }
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App/>, root)