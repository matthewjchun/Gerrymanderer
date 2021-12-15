import React, { useRef, useEffect, useState, useContext } from 'react';
import { DataContext, StateContext } from '../contexts/State';
import { GeoJSONContext } from '../contexts/GeoJSON';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Flex } from '@chakra-ui/react';
import '../App.css';
import StateDrawer from './StateDrawer';
import Legend from './Legend';
import { useDisclosure } from '@chakra-ui/react';
import * as constants from '../constants/constants';
import { StateDataContext } from '../contexts/StateData';
import { DistrictingSummaryContext } from '../contexts/DistrictingSummary';
import {DistrictColors} from '../constants/constants.js'
mapboxgl.accessToken =
  'pk.eyJ1IjoiY2VsdGljczQxNiIsImEiOiJja3R2MGM5dTQxajY4Mm5sNWV5YnNhNHg0In0.t9oiLZZUeZi0QpqUIik13w';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100.445882);
  const [lat, setLat] = useState(37.7837304);
  const [zoom, setZoom] = useState(4);
  const bounds = [
    [-116.895133, 32.868129], // Southwest coordinates
    [-68.230605, 47.25153], // Northeast coordinates
  ];
  const dummyMsg =
    '<strong>District 1</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 50.1%<br><b>Republican:</b> 48.4%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377';
  const [activeState, setActiveState] = useContext(StateContext);
  const [geoJSON, setGeoJSON] = useContext(GeoJSONContext);
  const [stateData, setStateData] = useContext(StateDataContext);
  const [districtingSummary, setDistrictingSummary] = useContext(DistrictingSummaryContext);
  const { isOpen, onOpen, onClose } = useDisclosure(); // open close state drawer
  // let refetch = false;

  /////////////////////// SETTING GEOJSON //////////////////////////////
  useEffect(() => {
    if(activeState == 'Arizona'){
      map.current.removeLayer('azcd_lines');
      map.current.removeSource('azcd');

      console.log(JSON.stringify(geoJSON))
      checkSrc('azcd', geoJSON);
      addLayer('azcd_lines', 'azcd', '#000000');
    }
  }, [geoJSON]);

  
  /////////////////////// MARKER METHODS //////////////////////////////
  const createMarker = async (longitude, latitude, msg) => {
    return new mapboxgl.Marker({ color: '#cfaf5b' })
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML(msg))
      .addTo(map.current);
  };
  const hide = () => {
    let markers = document.getElementsByClassName(
      'mapboxgl-marker mapboxgl-marker-anchor-center'
    );
    for (let i = 0; i < markers.length; i++) {
      markers[i].style.visibility = 'hidden';
    }
  };

  // Create a popup, but don't add it to the map yet.
      var popup = new mapboxgl.Popup({
        offset: [0, -7],
        closeButton: false,
        closeOnClick: false
      });

  /////////////////////// SERVER INTERACTIONS //////////////////////////////
  const handleStateFetch = async (map) => {
    const response = await fetch(
      `/stateFull?state=${constants.stateMap[activeState].toLowerCase()}`
    );
    const body = await response.json();
    await setStateData(body);
    await setDistrictingSummary(body['summary']['districtingSummaries'][0])
    console.log(body)
    return body;
  };

  const outlinesFetch = async (map) => {
    const response = await fetch('/stateOutlines');
    const body = await response.json();
    return body;
  };

  /////////////////////// VISIBILITY //////////////////////////////
  const checkSrc = async (name, data) => {
    if (!map.current.getSource(name)) {
      map.current.addSource(name, {
        type: 'geojson',
        data: data,
        generateId: true
      });
    }
  };

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
  };

  const visibToggle = async (abbrev, toggle) => {
    if (toggle == 'y') {
      let visibility = map.current.getLayoutProperty(
        abbrev + 'prec-boundary',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty(
          abbrev + 'prec-boundary',
          'visibility',
          'visible'
        );
      }

      visibility = map.current.getLayoutProperty(
        abbrev + 'cd_lines',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty(
          abbrev + 'cd_lines',
          'visibility',
          'visible'
        );
      }

      visibility = map.current.getLayoutProperty(
        abbrev + 'county-boundary',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty(
          'azcounty-boundary',
          'visibility',
          'visible'
        );
      }

      visibility = map.current.getLayoutProperty(
        abbrev + 'cd-fills',
        'visibility'
      );
      if (visibility === 'none') {
        map.current.setLayoutProperty(
          abbrev + 'cd-fills',
          'visibility',
          'visible'
        );
      }
    } else {
      let visibility = map.current.getLayoutProperty(
        abbrev + 'prec-boundary',
        'visibility'
      );
      if (visibility === 'visible') {
        map.current.setLayoutProperty(
          abbrev + 'prec-boundary',
          'visibility',
          'none'
        );
      }
      visibility = map.current.getLayoutProperty(
        abbrev + 'cd_lines',
        'visibility'
      );
      if (visibility === 'visible') {
        map.current.setLayoutProperty(
          abbrev + 'cd_lines',
          'visibility',
          'none'
        );
      }
      visibility = map.current.getLayoutProperty(
        abbrev + 'cd-fills',
        'visibility'
      );
      if (visibility === 'visible') {
        map.current.setLayoutProperty(
          abbrev + 'cd-fills',
          'visibility',
          'none'
        );
      }
      if (visibility === 'visible') {
        hide();
      }
      if (map.current.getLayer(abbrev + 'county-boundary') !== 'undefined') {
        map.current.setLayoutProperty(
          abbrev + 'county-boundary',
          'visibility',
          'none'
        );
      }
    }
  };

  const addStateLines = async (map) => {
    const stateLineData = await outlinesFetch();

    checkSrc('states', stateLineData['stateOutlines']);
    addPolygon('states', 'states', '#f8f8ff');

    checkSrc('arizona', stateLineData['az']);
    checkSrc('michigan', stateLineData['mi']);
    checkSrc('virginia', stateLineData['va']);
    // VISUALIZE STATES AS POLYGONS
    addPolygon('arizona', 'arizona', '#523e3c');
    addPolygon('michigan', 'michigan', '#523e3c');
    addPolygon('virginia', 'virginia', '#523e3c');
    // ADD OUTLINES TO STATES
    addOutline('outline_az', 'arizona');
    addOutline('outline_mi', 'michigan');
    addOutline('outline_va', 'virginia');
  };

  /////////////////////// ZOOM INTO STATES //////////////////////////////

  const districtsFillColor = [
    'match',
    ['get', 'BASENAME'],
    ...DistrictColors.reduce((r, e, i) => {
      r.push(i+1 + '', e);
      return r;
    }, []),
    '#FFFFFF'
  ]
  const addDistrictColoration = async(id, sourceId) => {
    map.current.addLayer({
      'id': id,
      'type': 'fill',
      'source': sourceId,
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': districtsFillColor,
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.75
          ]
      }
    });
    let hoveredStateId = null;
    map.current.on('mousemove', id, (e) => {
      if (e.features.length > 0) {
        if (hoveredStateId !== null) {
          map.current.setFeatureState(
          { source: sourceId, id: hoveredStateId },
          { hover: false }
          );
        }
        hoveredStateId = e.features[0].id;
        map.current.setFeatureState(
          { source: sourceId, id: hoveredStateId },
          { hover: true }
        );
      }
    });
    map.current.on('mouseleave', id, () => {
      if (hoveredStateId !== null) {
        map.current.setFeatureState(
          { source: sourceId, id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = null;
      });
  }
  const zoomIn = async (map, state) => {
    if (state == 'Arizona') {
      const stateData = await handleStateFetch();
      const stateSummary = stateData['summary'];

      map.current.flyTo({
        center: [
          stateData['summary']['centerLon'],
          stateData['summary']['centerLat'],
        ],
        essential: true,
        zoom: 6.2,
      });

      checkSrc('azcd', stateData['enacted']['districts']);
      checkSrc('azprecincts', stateData['enacted']['precincts']);
      checkSrc('azcounty', stateData['enacted']['counties']);
      map.current.setLayoutProperty('arizona', 'visibility', 'none');
      addDistrictColoration('azcd-fills', 'azcd');
      

      addLayer('azprec-boundary', 'azprecincts', '#fffae0');
      addLayer('azcounty-boundary', 'azcounty', '#cc2900');
      addLayer('azcd_lines', 'azcd', '#000000');
      

      onOpen();

      visibToggle('az', 'y');
    } else if (state == 'Michigan') {
      map.current.flyTo({
        center: [-84.3271772, 44.2330917],
        essential: true,
        zoom: 6.2,
      });
      onOpen();

      const micdData = await handleStateFetch();

      checkSrc('micd', micdData);
      addLayer('miprec-boundary', 'miprecincts', '#e6d1b5');
      addLayer('micounty-boundary', 'micounty', '#940f00');
      addLayer('micd_lines', 'micd', '#000000');

      map.current.addLayer({
        'id': 'micd-fills',
        'type': 'fill',
        'source': 'micd',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
          'fill-color': districtsFillColor,
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.75
            ]
        }
      });

      let hoveredStateId = null;
      map.current.on('mousemove', 'micd-fills', (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
            { source: 'micd', id: hoveredStateId },
            { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.current.setFeatureState(
            { source: 'micd', id: hoveredStateId },
            { hover: true }
          );
        }
      });
        map.current.on('mouseleave', 'micd-fills', () => {
        if (hoveredStateId !== null) {
        map.current.setFeatureState(
        { source: 'micd', id: hoveredStateId },
        { hover: false }
        );
        }
        hoveredStateId = null;
        });


      visibToggle('mi', 'y');
    } else {
      setActiveState('Virginia');
      map.current.flyTo({
        center: [-77.4525481898, 37.672247311],
        essential: true,
        zoom: 7,
      });
      onOpen();

      const vacdData = await handleStateFetch();

      checkSrc('vacd', vacdData);
      addLayer('vaprec-boundary', 'vaprecincts', '#e6d1b5');
      addLayer('vacounty-boundary', 'vacounty', '#940f00');
      addLayer('vacd_lines', 'vacd', '#000000');

      map.current.addLayer({
        'id': 'vacd-fills',
        'type': 'fill',
        'source': 'vacd',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
          'fill-color': districtsFillColor,
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.75
            ]
        }
      });

      let hoveredStateId = null;
      map.current.on('mousemove', 'vacd-fills', (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
            { source: 'vacd', id: hoveredStateId },
            { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.current.setFeatureState(
            { source: 'vacd', id: hoveredStateId },
            { hover: true }
          );
        }
      });
        map.current.on('mouseleave', 'vacd-fills', () => {
        if (hoveredStateId !== null) {
        map.current.setFeatureState(
        { source: 'vacd', id: hoveredStateId },
        { hover: false }
        );
        }
        hoveredStateId = null;
        });


      visibToggle('va', 'y');
    }
  };

  const zoomOut = (map) => {
    map.current.flyTo({
      center: [-100.445882, 37.7837304],
      essential: true,
      zoom: 4,
    });
    // arizona
    visibToggle('az', 'n');

    map.current.setLayoutProperty('arizona', 'visibility', 'visible');

    // michigan
    visibToggle('mi', 'n');

    // virginia
    visibToggle('va', 'n');
    onClose();
  };

  const generatedDistricting = (map) => {

  };

  /////////////////////// VISUALIZE MAP METHODS //////////////////////////////
  const addPolygon = async (id, data, color) => {
    map.current.addLayer({
      id: id,
      type: 'fill',
      source: data,
      layout: {},
      paint: {
        'fill-color': color, //'#523e3c'
        'fill-opacity': 0.5,
      },
    });
  };

  const addOutline = async (id, data) => {
    map.current.addLayer({
      id: id,
      type: 'line',
      source: data,
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 3,
      },
    });
  };

  /////////////////////// INITIALIZE MAP //////////////////////////////
  useEffect(() => {
    if (map.current) return;
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
      addStateLines();

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
        if(activeState != 'Michigan'){
          setActiveState('Michigan');
        }
      });
      map.current.on('click', 'virginia', (e) => {
        if(activeState != 'Virginia'){
          setActiveState('Virginia');
        }
      });
    });
  }, []);

  // MOVE MAP
  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
    });
  });

  /////////////////////// ACTIVE STATE CHANGES //////////////////////////////
  useEffect(() => {
    if (!map.current) return;
    if (activeState != 'Celtics') {
      zoomIn(map, activeState);
    } else if (activeState == 'Celtics') {
      if (lng != -100.445882 && lat != 37.7837304) {
        zoomOut(map);
        hide();
      }
    }
  }, [activeState]);

  return (
    <>
      <Legend current={map.current} />
      <Flex className='content' direction='column' justify='center'>
        <div ref={mapContainer} className='mapContainer' />
        {stateData != null ? (
          <StateDrawer
            isOpen={isOpen}
            onClose={onClose}
            active={activeState}
          />
        ) : null}
      </Flex>
    </>
  );
};
export default Map;
