import React, { useRef, useEffect, useState, useContext } from 'react';
import { StateContext } from './contexts/State/index';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Flex } from '@chakra-ui/react';

import './App.css';
import TopBar from './components/TopBar';

import StateDrawer from './components/StateDrawer';
import { Container } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
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
        // AZ CONGRESSIONAL DISTRICTS
        const azd1 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-110.7258455,34.9691324])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 1</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 50.1%<br><b>Republican:</b> 48.4%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const azd2 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-109.9566824,31.9274371])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 2</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);  
        const azd3 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-112.4379116,32.3667129])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 3</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const azd4 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-113.2180629,34.5988732])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 4</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const azd5 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-111.7146593,33.3377517])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 5</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const azd6 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-111.8903340,33.6672906])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 6</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const azd7 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([	-112.1190594,33.4286611])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 7</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const azd8 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-112.3000605,33.6925203])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 8</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const azd9 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-111.9492214,33.4062567])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 9</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);

        map.current.addLayer({
          id: 'azprec-boundary',
          type: 'line',
          source: 'azprecincts',
          paint: {
            'line-color': '#e6d1b5',
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
            'line-color': '#000000'

          },
          filter: ['==', '$type', 'Polygon'],
          layout: {
            'visibility': 'visible'
          }
        });
        /* map.current.addLayer({
          id: 'azcd_fill',
          type: 'fill',
          source: 'azcd',
          paint: {
            'fill-color': '#c9baad',
            'fill-opacity': [
              'case', ['boolean', ['feature-state', 'hover'], false],
              1, 0.5
              ]
          },
          filter: ['==', '$type', 'Polygon'],
          layout: {
          }
        }); */

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

        setActiveState('Arizona');
      });
      map.current.on('click', 'michigan', (e) => {
        map.current.flyTo({
          center: [-84.3271772, 44.2330917],
          essential: true,
          zoom: 6.2,
        });
        // MI CONGRESSIONAL DISTRICTS
        const mid1 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-86.4367294,46.1633289])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 1</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 50.1%<br><b>Republican:</b> 48.4%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid2 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-86.3219007,43.3968946])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 2</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);  
        const mid3 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-85.2426928,42.7156275])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 3</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid4 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-84.7482416,43.7322212])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 4</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid5 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-83.4755262,43.9135745])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 5</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid6 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-86.1570905,42.1675303])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 6</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid7 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-84.3029212,42.0958618])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 7</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid8 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-83.9416080,42.6473743])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 8</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid9 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-83.0505207,42.5312343])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 9</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid10 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-82.8710307,43.4603655])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 10</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid11 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-83.4568231,42.5300018])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 11</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid12 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-83.4482851,42.2053809])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 12</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid13 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-83.2511525,42.3803814])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 13</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid14 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-83.1507819,42.3892242])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 14</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const mid15 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-86.3928685,42.6363171	])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 15</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
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

        // VA CONGRESSIONAL DISTRICTS
        const va1 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-76.9800976,37.8807201	])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 1</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 50.1%<br><b>Republican:</b> 48.4%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const va2 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-75.9436791,37.3936967])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 2</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);  
        const va3 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-76.5714101,36.9137548	])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 3</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const va4 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-77.1571007,36.9617490	])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 4</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const va5 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-78.7459185,37.3323415])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 5</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const va6 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-79.1953112,38.1365430])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 6</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const va7 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-77.9014210,37.8201840])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 7</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const va8 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-77.1386215,38.7790638])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 8</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const va9 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-81.3222010,37.0008631])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 9</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const va10 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-77.8358695,39.0761620])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 10</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);
        const va11 = new mapboxgl.Marker({color: "#cfaf5b"})
          .setLngLat([-77.2948370,38.7890600])
          .setPopup(new mapboxgl.Popup().setHTML('<strong>District 11</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'))
          .addTo(map.current);

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
        {/* <StateDrawer isOpen={true} ></StateDrawer> */}
      </Flex>
    </>
  );
}
