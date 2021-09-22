import './App.css';
import Map from './components/Map';
import TopBar from './components/TopBar';

import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export default function App() {
  return (
    <div className='App'>
      <TopBar />
      <Map></Map>
    </div>
  );
}

/*export default function App() {
  let [viewport, setViewport] = useState({
    latitude: 38.2749,
    longitude: -98.35,
    zoom: 2.8,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <>
      <TopBar />
      <ReactMapGL
        mapboxApiAccessToken={
          'pk.eyJ1IjoibWpjaHVuIiwiYSI6ImNrdHV3Mmc5ZDIzd2cyb28ycjIxZHNkMjYifQ.60vjXo3tkAUMrL5aFgOkkQ'
        }
        {...viewport}
        onViewportChange={(newView) => setViewport(newView)}
      ></ReactMapGL>
    </>
  );
}
*/
