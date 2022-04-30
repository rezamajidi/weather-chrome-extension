import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, ButtonGroup, Grid, InputAdornment, IconButton, TextField } from '@material-ui/core'
import { Add as AddIcon, PictureInPicture as PictureInPictureIcon } from '@material-ui/icons'
import 'fontsource-roboto'
import './popup.css'
import WeatherCard from '../components/WeatherCard/WeatherCard';
import { setStoredCities, setStoredOptions, getStoredCities, getStoredOptions, LocalStorageOptions } from '../utils/storage'
import { Messages } from '../utils/messages'

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
  const handleOverlayButtonClick = () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    },(tabs)=> {
      if(tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, Messages.TOOGLE_OVERLAY)
      }
    })
  }

  const handleTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric'
    }
    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions)
    })
  }

  if(!options) {
    return null
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container alignItems="flex-end" spacing={2}>
        <Grid item xs={8}>
            <form onSubmit={(e) => {
              handleCityButtonClick();
              e.preventDefault()
            }}>
                <TextField
                  autoFocus={true}
                  focused
                  fullWidth
                  size="small"
                  label="City Name"
                  variant="outlined"
                  value={cityInput}
                  onChange={(event) => {
                    setCityInput(event.target.value)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          size="small"
                          color="primary"
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
            </form>
        </Grid>
        <Grid item xs={4}>
          <ButtonGroup fullWidth variant="outlined">
            <Button color="primary" onClick={handleTempScaleButtonClick}>
              {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
            </Button>
            <Button color="primary" onClick={handleOverlayButtonClick}>
              <PictureInPictureIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      {
        options.homeCity !== '' &&
        <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
        />
      }
      {
        cities.map((city, index) => (
          <WeatherCard
            city={city}
            tempScale={options.tempScale}
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