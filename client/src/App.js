import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Flex } from '@chakra-ui/react';

import './App.css';
import TopBar from './components/TopBar';
import az from './data/az.json';
import mi from './data/mi.json';
import va from './data/va.json';
import StateDrawer from './components/StateDrawer';
// import { useDisclosure } from '@chakra-ui/react';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2VsdGljczQxNiIsImEiOiJja3R2MGM5dTQxajY4Mm5sNWV5YnNhNHg0In0.t9oiLZZUeZi0QpqUIik13w';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100.445882);
  const [lat, setLat] = useState(37.7837304);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/celtics416/cktw1ft0304ye18p9i6etuxh2',
      center: [lng, lat],
      zoom: zoom,
      dragPan: false
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on('load', () => {
      // Add a data source containing GeoJSON data.
      map.current.addSource('arizona', {
          'type': 'geojson',
          'data': {
              'type': 'Feature',
              'geometry': {
                  'type': 'Polygon',
                  'coordinates': 
                  az.geometry.coordinates
              }
          }
      });

      map.current.addSource('michigan', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'MultiPolygon',
                'coordinates': mi.geometry.coordinates
            }
        }
      });

    map.current.addSource('virginia', {
      'type': 'geojson',
      'data': {
          'type': 'Feature',
          'geometry': {
              'type': 'MultiPolygon',
              'coordinates': va.geometry.coordinates
          }
      }
    });
  
      // Add a new layer to visualize the polygon.
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

    // Add a new layer to visualize the polygon.
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

    // Add a new layer to visualize the polygon.
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
    // Add a black outline around the polygon.
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
    });
  })

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      //setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // const { isOpen, onOpen, onClose } = useDisclosure();    // figure out where to better put this later

  return (
    <>
      <TopBar />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <div ref={mapContainer} className="map-container" />
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
