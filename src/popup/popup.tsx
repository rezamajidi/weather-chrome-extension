import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto'
import './popup.css'
import WeatherCard from './WeatherCard/WeatherCard';

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="berlin" />
      <WeatherCard city="tehran" />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App/>, root)