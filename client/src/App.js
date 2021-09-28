import React, { useRef, useEffect, useState, useContext } from 'react';
import { StateContext } from './contexts/State/index';

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
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100.445882);
  const [lat, setLat] = useState(37.7837304);
  const [zoom, setZoom] = useState(4.3);
  let hoveredStateId = null;

  //const [activeState, setActiveState] = useState('');
  const [activeState, setActiveState] = useContext(StateContext);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/celtics416/cktw1ft0304ye18p9i6etuxh2',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // color states
  useEffect(() => {
    if (!map.current) return;
    map.current.on('load', () => {
      // ADD STATES
      map.current.addSource('arizona', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/arizona.geojson',
      });
      map.current.addSource('michigan', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/michigan.geojson',
      });
      map.current.addSource('virginia', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/virginia.geojson',
      });
      map.current.addSource('azprecincts', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/az_2020.json',
      });
      map.current.addSource('miprecincts', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/mi_2020.json',
      });
      map.current.addSource('vaprecincts', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/va_2019.json',
      });
      map.current.addSource('azcd', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/az_cd.json',
      });
      map.current.addSource('micd', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/mi_cd.json',
      });
      map.current.addSource('vacd', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/va_cd.json',
      });
      map.current.addSource('states', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/state-outlines.json',
      });

      map.current.addLayer({
        id: 'states',
        type: 'fill',
        source: 'states',
        layout: {},
        paint: {
          'fill-color': '#808080',
          'fill-opacity': 0.5,
        },
      });

      // VISUALIZE STATES AS POLYGONS
      map.current.addLayer({
        id: 'arizona',
        type: 'fill',
        source: 'arizona', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#523e3c', // green color fill
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        id: 'michigan',
        type: 'fill',
        source: 'michigan', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#523e3c', // green color fill
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        id: 'virginia',
        type: 'fill',
        source: 'virginia', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#523e3c', // green color fill
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        id: 'michigan',
        type: 'fill',
        source: 'michigan', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#abd67a', // green color fill
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        id: 'virginia',
        type: 'fill',
        source: 'virginia', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#abd67b', // green color fill
          'fill-opacity': 0.5,
        },
      });

      // ADD OUTLINES TO STATES
      map.current.addLayer({
        id: 'outline',
        type: 'line',
        source: 'arizona',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3,
        },
      });
      map.current.addLayer({
        id: 'outline_mi',
        type: 'line',
        source: 'michigan',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3,
        },
      });
      map.current.addLayer({
        id: 'outline_va',
        type: 'line',
        source: 'virginia',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3,
        },
      });

      // ZOOM TO STATE
      map.current.on('click', 'states', (e) => {
        map.current.flyTo({
          center: [-100.445882, 37.7837304],
          essential: true,
          zoom: 3.5,
        });

        // arizona
        let visibility = map.current.getLayoutProperty(
          'azprec-boundary',
          'visibility'
        );
        if (visibility === 'visible') {
          map.current.setLayoutProperty(
            'azprec-boundary',
            'visibility',
            'none'
          );
        }
        visibility = map.current.getLayoutProperty('azcd_lines', 'visibility');
        if (visibility === 'visible') {
          map.current.setLayoutProperty('azcd_lines', 'visibility', 'none');
        }

        // michigan
        visibility = map.current.getLayoutProperty(
          'miprec-boundary',
          'visibility'
        );
        if (visibility === 'visible') {
          map.current.setLayoutProperty(
            'miprec-boundary',
            'visibility',
            'none'
          );
        }
        visibility = map.current.getLayoutProperty('micd_lines', 'visibility');
        if (visibility === 'visible') {
          map.current.setLayoutProperty('micd_lines', 'visibility', 'none');
        }

        // virginia
        visibility = map.current.getLayoutProperty(
          'vaprec-boundary',
          'visibility'
        );
        if (visibility === 'visible') {
          map.current.setLayoutProperty(
            'vaprec-boundary',
            'visibility',
            'none'
          );
        }
        visibility = map.current.getLayoutProperty('vacd_lines', 'visibility');
        if (visibility === 'visible') {
          map.current.setLayoutProperty('vacd_lines', 'visibility', 'none');
        }

        setActiveState(null);
      });

      map.current.on('click', 'arizona', (e) => {
        map.current.flyTo({
          center: [-112.0693, 34.2537],
          essential: true,
          zoom: 7,
        });
        map.current.addLayer({
          id: 'azprec-boundary',
          type: 'line',
          source: 'azprecincts',
          paint: {
            'line-color': '#0042b0',
          },
          filter: ['==', '$type', 'Polygon'],
          layout: {
            visibility: 'visible',
          },
        });
        map.current.addLayer({
          id: 'azcd_lines',
          type: 'line',
          source: 'azcd',
          paint: {
            'line-color': '#FFFFFF',
          },
          filter: ['==', '$type', 'Polygon'],
        });
        map.current.addLayer({
          id: 'azcd_fill',
          type: 'fill',
          source: 'azcd',
          paint: {
            'fill-color': '#fae5cf',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.5,
            ],
          },
          filter: ['==', '$type', 'Polygon'],
          layout: {
            visibility: 'visible',
          },
        });

        let visibility = map.current.getLayoutProperty(
          'azprec-boundary',
          'visibility'
        );
        if (visibility === 'none') {
          map.current.setLayoutProperty(
            'azprec-boundary',
            'visibility',
            'visible'
          );
        }
        visibility = map.current.getLayoutProperty('azcd_lines', 'visibility');
        if (visibility === 'none') {
          map.current.setLayoutProperty('azcd_lines', 'visibility', 'visible');
        }
        /*new mapboxgl.Popup().setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.name)
        .addTo(map.current);*/

        // TODO: POOPUP
        map.current.on('click', 'arizona', (e) => {
          // Copy coordinates array.
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description =
            '<strong>District 1</strong><p><b>Population:</b> 724,868<br><b>Gender:</b> 50.3% Female, 49.7% Male<br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377<br><b>High school graduation rate:</b> 85.3%<br><b>College graduation rate:</b> 23.5%';

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          console.log(coordinates);
          new mapboxgl.Popup()
            .setLngLat([-112.0693, 34.2537])
            .setHTML(description)
            .addTo(map.current);
        });
        map.current.on('mousemove', 'azcd_fill', (e) => {
          if (e.features.length > 0) {
            if (hoveredStateId !== null) {
              map.current.setFeatureState(
                { source: 'azcd', id: hoveredStateId },
                { hover: false }
              );
            }
            hoveredStateId = e.features[0].GEOID20;
            map.current.setFeatureState(
              { source: 'azcd', id: hoveredStateId },
              { hover: true }
            );
          }
        });

        setActiveState('Arizona');
      });
      map.current.on('click', 'michigan', (e) => {
        map.current.flyTo({
          center: [-84.3271772, 44.2330917],
          essential: true,
          zoom: 6.2,
        });
        map.current.addLayer({
          id: 'miprec-boundary',
          type: 'line',
          source: 'miprecincts',
          paint: {
            'line-color': '#ebd8d3',
          },
          filter: ['==', '$type', 'Polygon'],
          layout: {
            visibility: 'visible',
          },
        });
        map.current.addLayer({
          id: 'micd_lines',
          type: 'line',
          source: 'micd',
          paint: {
            'line-color': '#45322f',
          },
          filter: ['==', '$type', 'Polygon'],
          layout: {
            visibility: 'visible',
          },
        });

        let visibility = map.current.getLayoutProperty(
          'miprec-boundary',
          'visibility'
        );
        if (visibility === 'none') {
          map.current.setLayoutProperty(
            'miprec-boundary',
            'visibility',
            'visible'
          );
        }
        visibility = map.current.getLayoutProperty('micd_lines', 'visibility');
        if (visibility === 'none') {
          map.current.setLayoutProperty('micd_lines', 'visibility', 'visible');
        }

        setActiveState('Michigan');
      });
      map.current.on('click', 'virginia', (e) => {
        map.current.flyTo({
          center: [-77.4525481898, 37.672247311],
          essential: true,
          zoom: 7,
        });
        map.current.addLayer({
          id: 'vaprec-boundary',
          type: 'line',
          source: 'vaprecincts',
          paint: {
            'line-color': '#ebd8d3',
          },
          filter: ['==', '$type', 'Polygon'],
          layout: {
            visibility: 'visible',
          },
        });
        map.current.addLayer({
          id: 'vacd_lines',
          type: 'line',
          source: 'vacd',
          paint: {
            'line-color': '#45322f',
          },
          filter: ['==', '$type', 'Polygon'],
          layout: {
            visibility: 'visible',
          },
        });

        let visibility = map.current.getLayoutProperty(
          'vaprec-boundary',
          'visibility'
        );
        if (visibility === 'none') {
          map.current.setLayoutProperty(
            'vaprec-boundary',
            'visibility',
            'visible'
          );
        }
        visibility = map.current.getLayoutProperty('vacd_lines', 'visibility');
        if (visibility === 'none') {
          map.current.setLayoutProperty('vacd_lines', 'visibility', 'visible');
        }

        setActiveState('Virginia');
      });
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
    });
  });
  // const { isOpen, onOpen, onClose } = useDisclosure();    // figure out where to better put this later
  // const zoomOut = () => {
  //   // map zoom out

  // }

  // useEffect hook for performing actions when activeState changes
  useEffect(() => {
    if (!map.current) return;
    if (activeState == 'Arizona') {
      map.current.flyTo({
        center: [-112.0693, 34.2537],
        essential: true,
        zoom: 6.2,
      });
      map.current.addLayer({
        id: 'azprec-boundary',
        type: 'line',
        source: 'azprecincts',
        paint: {
          'line-color': '#917a7a',
        },
        filter: ['==', '$type', 'Polygon'],
      });
      map.current.addLayer({
        id: 'azcd_lines',
        type: 'line',
        source: 'azcd',
        paint: {
          'line-color': '#3aadd6',
        },
        filter: ['==', '$type', 'Polygon'],
      });
    } else if (activeState == 'Michigan') {
      map.current.flyTo({
        center: [-84.3271772, 44.2330917],
        essential: true,
        zoom: 6.2,
      });
      map.current.addLayer({
        id: 'miprec-boundary',
        type: 'line',
        source: 'miprecincts',
        paint: {
          'line-color': '#917a7a',
        },
        filter: ['==', '$type', 'Polygon'],
      });
      map.current.addLayer({
        id: 'micd_lines',
        type: 'line',
        source: 'micd',
        paint: {
          'line-color': '#3aadd6',
        },
        filter: ['==', '$type', 'Polygon'],
      });
    } else if (activeState == 'Virginia') {
      map.current.flyTo({
        center: [-77.4525481898, 37.672247311],
        essential: true,
        zoom: 7,
      });

      map.current.addLayer({
        id: 'vaprec-boundary',
        type: 'line',
        source: 'vaprecincts',
        paint: {
          'line-color': '#917a7a',
        },
        filter: ['==', '$type', 'Polygon'],
      });
      map.current.addLayer({
        id: 'vacd_lines',
        type: 'line',
        source: 'vacd',
        paint: {
          'line-color': '#3aadd6',
        },
        filter: ['==', '$type', 'Polygon'],
      });
    }
  }, [activeState]);

  return (
    <>
      <TopBar />
      <div ref={mapContainer} className='map-container' />
      <Flex
        className='content'
        direction='column'
        align='center'
        justify='center'
      >
        <div ref={mapContainer} className='mapContainer' />
        {/* <StateDrawer isOpen={true}></StateDrawer> */}
      </Flex>
    </>
  );
}
