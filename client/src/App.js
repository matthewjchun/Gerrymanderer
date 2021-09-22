import './App.css';
import TopBar from './components/TopBar';
import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export default function App() {
  let [viewport, setViewport] = useState({
    latitude: 45,
    longitude: -75,
    width: '100vw',
    height: '100vh',
    zoom: 11
  });

  return (
    <div>
      <TopBar />
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken = {'pk.eyJ1IjoiY2VsdGljczQxNiIsImEiOiJja3R2MGM5dTQxajY4Mm5sNWV5YnNhNHg0In0.t9oiLZZUeZi0QpqUIik13w'}
      mapStyle="mapbox://styles/celtics416/cktv0fpu01ddn17nygi0ck49g"
      onViewportChange={viewport => {
        setViewport(viewport);}}
      >
      </ReactMapGL>
    </div>
  );
}
