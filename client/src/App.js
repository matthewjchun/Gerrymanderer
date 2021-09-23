import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Flex } from '@chakra-ui/react';

import './App.css';
import TopBar from './components/TopBar';
import StateDrawer from './components/StateDrawer';
// import { useDisclosure } from '@chakra-ui/react';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2VsdGljczQxNiIsImEiOiJja3R2MGM5dTQxajY4Mm5sNWV5YnNhNHg0In0.t9oiLZZUeZi0QpqUIik13w';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100.445882);
  const [lat, setLat] = useState(39.7837304);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // const { isOpen, onOpen, onClose } = useDisclosure();    // figure out where to better put this later

  return (
    <>
      <TopBar />
      <Flex
        className='content'
        direction='column'
        align='center'
        justify='center'
      >
        <div className='coordinates'>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className='mapContainer' />
        {/* <StateDrawer isOpen={true}></StateDrawer>  // closing aint workin so ill figure out tmw*/} 
      </Flex>
    </>
  );
}
