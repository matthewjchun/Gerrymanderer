import React, { useRef, useEffect, useState, useContext } from 'react';
import { DataContext, StateContext } from './contexts/State/index';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Flex } from '@chakra-ui/react';
import './App.css';
import TopBar from './components/TopBar';
import StateDrawer from './components/StateDrawer';
import { useDisclosure } from '@chakra-ui/react';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2VsdGljczQxNiIsImEiOiJja3R2MGM5dTQxajY4Mm5sNWV5YnNhNHg0In0.t9oiLZZUeZi0QpqUIik13w';

export default function App() {
  const mapContainer = useRef(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100.445882);
  const [lat, setLat] = useState(37.7837304);
  var showDistrict = true;
  var showCounty = true;
  var showPrecinct = true;
  const [zoom, setZoom] = useState(4);
  let hoveredStateId = null;
  const bounds = [
    [-116.895133, 32.868129], // Southwest coordinates
    [-68.230605, 47.25153], // Northeast coordinates
  ];

  const [activeState, setActiveState] = useContext(StateContext);
  // const [geoJSONdata] = useState(null);

  const hide = () => {
    let markers = document.getElementsByClassName(
      'mapboxgl-marker mapboxgl-marker-anchor-center'
    );
    for (let i = 0; i < markers.length; i++) {
      markers[i].style.visibility = 'hidden';
    }
  };

/////////////////////// ZOOM IN AND SERVER INTERACTIONS //////////////////////////////

  const handleFetch = async (map) => {
    const response = await fetch(
      `/districtings/geojson/?state=${activeState.toLowerCase()}`
    );
    const body = await response.json();
    return body;
  };

  const checkSrc = async (name, data) => {
    if(!(map.current.getSource(name))){
      map.current.addSource(name, {
        type: 'geojson',
        data: data,
      });
    }
  }

  const addLayer = async (id, src, paint) => {
    map.current.addLayer({
      id: id,
      type: 'line',
      source: src,
      paint: {
        'line-color': paint,
      },
      filter: ['==', '$type', 'Polygon'],
      layout: {
        visibility: 'visible',
      },
    });
  }

  // const visibToggle = async (abbrev) => {
  //   let visibility = map.current.getLayoutProperty(
  //     abbrev + 'prec-boundary',
  //     'visibility'
  //   );
  //   if (visibility === 'none') {
  //     map.current.setLayoutProperty(abbrev + 'prec-boundary', 'visibility', 'visible');
  //   }

  //   visibility = map.current.getLayoutProperty(
  //     abbrev + 'cd_lines',
  //     'visibility'
  //   );
  //   if (visibility === 'none') {
  //     map.current.setLayoutProperty(abbrev + 'cd_lines', 'visibility', 'visible');
  //   }

  //   visibility = map.current.getLayoutProperty(
  //     abbrev + 'county-boundary',
  //     'visibility'
  //   );
  //   if (visibility === 'none') {
  //     map.current.setLayoutProperty(
  //       'azcounty-boundary',
  //       'visibility',
  //       'visible'
  //     );
  //   }
  // }

  const zoomIn = async (map, state) => {
    if(state == "Arizona"){
      map.current.flyTo({
        center: [-112.0693, 34.2537],
        essential: true,
        zoom: 6.2,
      });
      onOpen();
  
      const azcdData = await handleFetch();
  
      checkSrc('azcd', azcdData);
      addLayer('azprec-boundary', 'azprecincts', '#e6d1b5');
      addLayer('azcounty-boundary', 'azcounty', '#940f00');
      addLayer('azcd_lines', 'azcd', '#000000')
  
      // AZ CONGRESSIONAL DISTRICTS
      const azd1 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-110.7258455, 34.9691324])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 1</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 50.1%<br><b>Republican:</b> 48.4%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const azd2 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-109.9566824, 31.9274371])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 2</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const azd3 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-112.4379116, 32.3667129])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 3</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const azd4 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-113.2180629, 34.5988732])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 4</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const azd5 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-111.7146593, 33.3377517])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 5</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const azd6 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-111.890334, 33.6672906])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 6</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const azd7 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-112.1190594, 33.4286611])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 7</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const azd8 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-112.3000605, 33.6925203])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 8</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const azd9 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-111.9492214, 33.4062567])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 9</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      
      // visibToggle('az');
      let visibility = map.current.getLayoutProperty(
        'azprec-boundary',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty('azprec-boundary', 'visibility', 'visible');
      }
  
      visibility = map.current.getLayoutProperty(
        'azcd_lines',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty('azcd_lines', 'visibility', 'visible');
      }
  
      visibility = map.current.getLayoutProperty(
        'azcounty-boundary',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty(
          'azcounty-boundary',
          'visibility',
          'visible'
        );
      }
    }

    else if(state == "Michigan"){
      map.current.flyTo({
        center: [-84.3271772, 44.2330917],
        essential: true,
        zoom: 6.2,
      });
      onOpen();

      const micdData = await handleFetch();

      checkSrc('micd', micdData)
      addLayer('miprec-boundary', 'miprecincts', '#e6d1b5');
      addLayer('micounty-boundary', 'micounty', '#940f00');
      addLayer('micd_lines', 'micd', '#000000')

///////////////// MI CONGRESSIONAL DISTRICTS MARKERS //////////////////
      const mid1 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-86.4367294, 46.1633289])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 1</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 50.1%<br><b>Republican:</b> 48.4%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid2 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-86.3219007, 43.3968946])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 2</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid3 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-85.2426928, 42.7156275])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 3</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid4 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-84.7482416, 43.7322212])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 4</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid5 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-83.4755262, 43.9135745])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 5</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid6 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-86.1570905, 42.1675303])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 6</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid7 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-84.3029212, 42.0958618])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 7</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid8 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-83.941608, 42.6473743])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 8</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid9 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-83.0505207, 42.5312343])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 9</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid10 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-82.8710307, 43.4603655])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 10</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid11 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-83.4568231, 42.5300018])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 11</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid12 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-83.4482851, 42.2053809])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 12</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid13 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-83.2511525, 42.3803814])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 13</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid14 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-83.1507819, 42.3892242])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 14</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const mid15 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-86.3928685, 42.6363171])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 15</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);

      let visibility = map.current.getLayoutProperty(
        'miprec-boundary',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty('miprec-boundary', 'visibility', 'visible');
      }
      visibility = map.current.getLayoutProperty('micd_lines', 'visibility');
      if (visibility === 'none') {
        map.current.setLayoutProperty('micd_lines', 'visibility', 'visible');
      }
      visibility = map.current.getLayoutProperty(
        'micounty-boundary',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty(
          'micounty-boundary',
          'visibility',
          'visible'
        );
      }
    }
    else{
      setActiveState('Virginia');
      map.current.flyTo({
        center: [-77.4525481898, 37.672247311],
        essential: true,
        zoom: 7,
      });
      onOpen();
  
      const vacdData = await handleFetch();
  
      checkSrc('vacd', vacdData)
      addLayer('vaprec-boundary', 'vaprecincts', '#e6d1b5');
      addLayer('vacounty-boundary', 'vacounty', '#940f00');
      addLayer('vacd_lines', 'vacd', '#000000')
  
      // VA CONGRESSIONAL DISTRICTS
      const va1 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-76.9800976, 37.8807201])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 1</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 50.1%<br><b>Republican:</b> 48.4%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va2 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-75.9436791, 37.3936967])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 2</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va3 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-76.5714101, 36.9137548])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 3</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va4 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-77.1571007, 36.961749])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 4</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va5 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-78.7459185, 37.3323415])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 5</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va6 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-79.1953112, 38.136543])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 6</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va7 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-77.901421, 37.820184])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 7</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va8 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-77.1386215, 38.7790638])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 8</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va9 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-81.322201, 37.0008631])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 9</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va10 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-77.8358695, 39.076162])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 10</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      const va11 = new mapboxgl.Marker({ color: '#cfaf5b' })
        .setLngLat([-77.294837, 38.78906])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<strong>District 11</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 54.5%<br><b>Republican:</b> 43.9%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377'
          )
        )
        .addTo(map.current);
      let visibility = map.current.getLayoutProperty(
        'vaprec-boundary',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty('vaprec-boundary', 'visibility', 'visible');
      }
      visibility = map.current.getLayoutProperty('vacd_lines', 'visibility');
      if (visibility === 'none') {
        map.current.setLayoutProperty('vacd_lines', 'visibility', 'visible');
      }
      visibility = map.current.getLayoutProperty(
        'vacounty-boundary',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty(
          'vacounty-boundary',
          'visibility',
          'visible'
        );
      }
    }
  };

  const zoomOut = (map) => {
    map.current.flyTo({
      center: [-100.445882, 37.7837304],
      essential: true,
      zoom: 4,
    });
    // arizona
    let visibility = map.current.getLayoutProperty(
      'azprec-boundary',
      'visibility'
    );
    if (visibility === 'visible') {
      map.current.setLayoutProperty('azprec-boundary', 'visibility', 'none');
    }
    visibility = map.current.getLayoutProperty('azcd_lines', 'visibility');
    if (visibility === 'visible') {
      map.current.setLayoutProperty('azcd_lines', 'visibility', 'none');
    }
    if (visibility === 'visible') {
      hide();
    }
    if (map.current.getLayer('azcounty-boundary') !== 'undefined') {
      map.current.setLayoutProperty('azcounty-boundary', 'visibility', 'none');
    }

    // michigan
    visibility = map.current.getLayoutProperty('miprec-boundary', 'visibility');
    if (visibility === 'visible') {
      map.current.setLayoutProperty('miprec-boundary', 'visibility', 'none');
    }
    visibility = map.current.getLayoutProperty('micd_lines', 'visibility');
    if (visibility === 'visible') {
      map.current.setLayoutProperty('micd_lines', 'visibility', 'none');
    }
    if (visibility === 'visible') {
      hide();
    }
    if (map.current.getLayer('micounty-boundary') !== 'undefined') {
      map.current.setLayoutProperty('micounty-boundary', 'visibility', 'none');
    }

    // virginia
    visibility = map.current.getLayoutProperty('vaprec-boundary', 'visibility');
    if (visibility === 'visible') {
      map.current.setLayoutProperty('vaprec-boundary', 'visibility', 'none');
    }
    visibility = map.current.getLayoutProperty('vacd_lines', 'visibility');
    if (visibility === 'visible') {
      map.current.setLayoutProperty('vacd_lines', 'visibility', 'none');
    }
    if (visibility === 'visible') {
      hide();
    }
    if (map.current.getLayer('vacounty-boundary') !== 'undefined') {
      map.current.setLayoutProperty('vacounty-boundary', 'visibility', 'none');
    }
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/celtics416/cktw1ft0304ye18p9i6etuxh2',
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

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
      map.current.addSource('azcounty', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/AZ_Counties.json',
      });
      map.current.addSource('micounty', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/MI_Counties.json',
      });
      map.current.addSource('vacounty', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/AndyZheng430/Geojson/main/VA_Counties.json',
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
          'fill-color': '#f8f8ff',
          'fill-opacity': 0.5,
        },
      });

      // VISUALIZE STATES AS POLYGONS
      map.current.addLayer({
        id: 'arizona',
        type: 'fill',
        source: 'arizona', 
        layout: {},
        paint: {
          'fill-color': '#523e3c', 
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        id: 'michigan',
        type: 'fill',
        source: 'michigan',
        layout: {},
        paint: {
          'fill-color': '#523e3c', 
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        id: 'virginia',
        type: 'fill',
        source: 'virginia', 
        layout: {},
        paint: {
          'fill-color': '#523e3c', 
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        id: 'michigan',
        type: 'fill',
        source: 'michigan', 
        layout: {},
        paint: {
          'fill-color': '#abd67a', 
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        id: 'virginia',
        type: 'fill',
        source: 'virginia',
        layout: {},
        paint: {
          'fill-color': '#abd67b',
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
        zoomOut(map);
        onClose();
        setActiveState('Celtics');
      });

      map.current.on('click', 'arizona', (e) => {
        setActiveState('Arizona');
      });
      map.current.on('click', 'michigan', (e) => {
        setActiveState('Michigan');
      });
      map.current.on('click', 'virginia', (e) => {
        setActiveState('Virginia');
      });
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
    });
  });

  const { isOpen, onOpen, onClose } = useDisclosure(); // figure out where to better put this later

  // useEffect hook for performing actions when activeState changes
  useEffect(() => {
    if (!map.current) return;
    if (activeState != 'Celtics') {
      zoomIn(map, activeState);
    } 
    else if (activeState == 'Celtics') {
      if (lng != -100.445882 && lat != 37.7837304) {
        zoomOut(map);
        hide();
      }
    }
  }, [activeState]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    var district = document.getElementById('districtLegend');
    var county = document.getElementById('countyLegend');
    var precinct = document.getElementById('precinctLegend');
    district.onclick = function (e) {
      if (showDistrict) {
        if (map.current.getLayer('azcd_lines') !== 'undefined') {
          map.current.setLayoutProperty('azcd_lines', 'visibility', 'none');
        }
        if (map.current.getLayer('micd_lines') !== 'undefined') {
          map.current.setLayoutProperty('micd_lines', 'visibility', 'none');
        }
        if (map.current.getLayer('vacd_lines') !== 'undefined') {
          map.current.setLayoutProperty('vacd_lines', 'visibility', 'none');
        }
      }
      if (!showDistrict) {
        if (map.current.getLayer('azcd_lines') !== 'undefined') {
          map.current.setLayoutProperty('azcd_lines', 'visibility', 'visible');
        }
        if (map.current.getLayer('micd_lines') !== 'undefined') {
          map.current.setLayoutProperty('micd_lines', 'visibility', 'visible');
        }
        if (map.current.getLayer('vacd_lines') !== 'undefined') {
          map.current.setLayoutProperty('vacd_lines', 'visibility', 'visible');
        }
      }
    };
    county.onclick = function (e) {
      if (showCounty) {
        if (map.current.getLayer('azcounty-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'azcounty-boundary',
            'visibility',
            'none'
          );
        }
        if (map.current.getLayer('micounty-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'micounty-boundary',
            'visibility',
            'none'
          );
        }
        if (map.current.getLayer('vacounty-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'vacounty-boundary',
            'visibility',
            'none'
          );
        }
      }
      if (!showCounty) {
        if (map.current.getLayer('azcounty-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'azcounty-boundary',
            'visibility',
            'visible'
          );
        }
        if (map.current.getLayer('micounty-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'micounty-boundary',
            'visibility',
            'visible'
          );
        }
        if (map.current.getLayer('vacounty-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'vacounty-boundary',
            'visibility',
            'visible'
          );
        }
      }
    };
    precinct.onclick = function (e) {
      if (showPrecinct) {
        if (map.current.getLayer('azprec-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'azprec-boundary',
            'visibility',
            'none'
          );
        }
        if (map.current.getLayer('miprec-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'miprec-boundary',
            'visibility',
            'none'
          );
        }
        if (map.current.getLayer('vaprec-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'vaprec-boundary',
            'visibility',
            'none'
          );
        }
      }
      if (!showPrecinct) {
        if (map.current.getLayer('azprec-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'azprec-boundary',
            'visibility',
            'visible'
          );
        }
        if (map.current.getLayer('miprec-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'miprec-boundary',
            'visibility',
            'visible'
          );
        }
        if (map.current.getLayer('vaprec-boundary') !== 'undefined') {
          map.current.setLayoutProperty(
            'vaprec-boundary',
            'visibility',
            'visible'
          );
        }
      }
    };
  });

  function toggleDistrict() {
    if (showDistrict) {
      showDistrict = false;
      document.getElementById('districtColor').style.backgroundColor =
        '#FFFFFF';
    } else {
      showDistrict = true;
      document.getElementById('districtColor').style.backgroundColor =
        '#45322f';
    }
  }
  function toggleCounty() {
    if (showCounty) {
      showCounty = false;
      document.getElementById('countyColor').style.backgroundColor = '#FFFFFF';
    } else {
      showCounty = true;
      document.getElementById('countyColor').style.backgroundColor = '#940f00';
    }
  }
  function togglePrecinct() {
    if (showPrecinct) {
      showPrecinct = false;
      document.getElementById('precinctColor').style.backgroundColor =
        '#FFFFFF';
    } else {
      showPrecinct = true;
      document.getElementById('precinctColor').style.backgroundColor =
        '#ebd8d3';
    }
  }

  return (
    <>
      <TopBar />
      <div className='legend'>
        <h4 style={{ fontWeight: 'bold' }}>Legend</h4>
        <div id='districtLegend' onClick={toggleDistrict}>
          <span
            id='districtColor'
            style={{ backgroundColor: '#45322f' }}
          ></span>
          Districts
        </div>
        <div id='countyLegend' onClick={toggleCounty}>
          <span id='countyColor' style={{ backgroundColor: '#940f00' }}></span>
          Counties
        </div>
        <div id='precinctLegend' onClick={togglePrecinct}>
          <span
            id='precinctColor'
            style={{ backgroundColor: '#ebd8d3' }}
          ></span>
          Precincts
        </div>
      </div>
      <Flex className='content' direction='column' justify='center'>
        <div ref={mapContainer} className='mapContainer' />
        <StateDrawer isOpen={isOpen} onClose={onClose} active={activeState} />
      </Flex>
    </>
  );
}
