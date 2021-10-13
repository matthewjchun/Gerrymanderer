import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './App.css';
import Map from './components/Map';
import TopBar from './components/TopBar';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2VsdGljczQxNiIsImEiOiJja3R2MGM5dTQxajY4Mm5sNWV5YnNhNHg0In0.t9oiLZZUeZi0QpqUIik13w';

export default function App() {
  return (
    <>
      <TopBar />
      <Map />
    </>
  );
}