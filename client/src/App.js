import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Flex } from '@chakra-ui/react';

import './App.css';
import TopBar from './components/TopBar';
import azprecincts from './data/az_2020.json';
import miprecincts from './data/mi_2020.json';
import vaprecincts from './data/va_2019.json';
import StateDrawer from './components/StateDrawer';
// import { useDisclosure } from '@chakra-ui/react';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2VsdGljczQxNiIsImEiOiJja3R2MGM5dTQxajY4Mm5sNWV5YnNhNHg0In0.t9oiLZZUeZi0QpqUIik13w';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100.445882);
  const [lat, setLat] = useState(37.7837304);
  const [zoom, setZoom] = useState(3.5);
  var arizona = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/celtics416/cktw1ft0304ye18p9i6etuxh2',
      center: [lng, lat],
      zoom: zoom
    });
  });

  // color states
  useEffect(() => {
    if (!map.current) return;
    map.current.on('load', () => {
      // ADD STATES
      map.current.addSource('arizona', {
          'type': 'geojson',
          'data': 'https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/arizona.geojson'
      });
      map.current.addSource('michigan', {
        'type': 'geojson',
        'data': 'https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/michigan.geojson'
      });
      map.current.addSource('virginia', {
        'type': 'geojson',
        'data': 'https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/virginia.geojson'
      });
      map.current.addSource('azprecincts', {
        'type': 'geojson',
        'data': azprecincts
      });
      map.current.addSource('miprecincts', {
        'type': 'geojson',
        'data': miprecincts
      });
      map.current.addSource('vaprecincts', {
        'type': 'geojson',
        'data': vaprecincts
      });


      // VISUALIZE STATES AS POLYGONS
      map.current.addLayer({
          'id': 'arizona',
          'type': 'fill',
          'source': 'arizona', // reference the data source
          'layout': {},
          'paint': {
              'fill-color': '#abd67a', // green color fill
              'fill-opacity': 0.5
          },
      });
      map.current.addLayer({
        'id': 'michigan',
        'type': 'fill',
        'source': 'michigan', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#abd67a', // green color fill
            'fill-opacity': 0.5
        },
      });
      map.current.addLayer({
        'id': 'virginia',
        'type': 'fill',
        'source': 'virginia', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#abd67b', // green color fill
            'fill-opacity': 0.5
        },
      });
  
      // ADD OUTLINES TO STATES
      map.current.addLayer({
          'id': 'outline',
          'type': 'line',
          'source': 'arizona',
          'layout': {},
          'paint': {
              'line-color': '#000',
              'line-width': 3
          }
      });
      map.current.addLayer({
        'id': 'outline_mi',
        'type': 'line',
        'source': 'michigan',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 3
        }
      });
      map.current.addLayer({
        'id': 'outline_va',
        'type': 'line',
        'source': 'virginia',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 3
        }
      });

      // ZOOM TO STATE
      map.current.on('click', 'arizona', (e) => {
        map.current.flyTo({
          center: [-112.0693, 34.2537],
          essential: true,
          zoom: 6.2
        });
        map.current.addLayer({
          'id': 'azprec-boundary',
          'type': 'line',
          'source': 'azprecincts',
          'paint': {
            'line-color': '#917a7a'
          },
          'filter': ['==', '$type', 'Polygon']
        });
        /*new mapboxgl.Popup().setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.name)
        .addTo(map.current);*/
      });
      map.current.on('click', 'michigan', (e) => {
        map.current.flyTo({
          center: [-84.3271772, 44.2330917],
          essential: true,
          zoom: 6.2
        });
        map.current.addLayer({
          'id': 'miprec-boundary',
          'type': 'line',
          'source': 'miprecincts',
          'paint': {
            'line-color': '#917a7a'
          },
          'filter': ['==', '$type', 'Polygon']
        });
      });
      map.current.on('click', 'virginia', (e) => {
        map.current.flyTo({
          center: [-77.4525481898, 37.672247311],
          essential: true,
          zoom: 7
        });

        map.current.addLayer({
          'id': 'vaprec-boundary',
          'type': 'line',
          'source': 'vaprecincts',
          'paint': {
            'line-color': '#917a7a'
          },
          'filter': ['==', '$type', 'Polygon']
        });
      });
    });
  })

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
    });
  });
  // const { isOpen, onOpen, onClose } = useDisclosure();    // figure out where to better put this later

  return (
    <>
      <TopBar />
      <div ref={mapContainer} className="map-container" />
      <Flex
        className='content'
        direction='column'
        align='center'
        justify='center'
      >
        <div className='coordinates'>
          Longitude: {lng} | Latitude: {lat}
        </div>
        <div ref={mapContainer} className='mapContainer' />
        {/* <StateDrawer isOpen={true}></StateDrawer>  //closing aint workin so ill figure out tmw  */}
      </Flex>
    </>
  );
}

