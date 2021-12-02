import React, { useRef, useEffect, useState, useContext } from 'react';
import { DataContext, StateContext } from '../contexts/State/index';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Flex } from '@chakra-ui/react';
import '../App.css';
import StateDrawer from './StateDrawer';
import Legend from './Legend';
import { useDisclosure } from '@chakra-ui/react';
import * as constants from '../constants/constants';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2VsdGljczQxNiIsImEiOiJja3R2MGM5dTQxajY4Mm5sNWV5YnNhNHg0In0.t9oiLZZUeZi0QpqUIik13w';

const Map = () => {
  const mapContainer = useRef(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100.445882);
  const [lat, setLat] = useState(37.7837304);
  const [stateData, setStateData] = useState();
  const [zoom, setZoom] = useState(4);
  let hoveredStateId = null;
  const bounds = [
    [-116.895133, 32.868129], // Southwest coordinates
    [-68.230605, 47.25153], // Northeast coordinates
  ];
  const dummyMsg =
    '<strong>District 1</strong><p><br><b>Total Population:</b> 724,868<br><b>Democratic:</b> 50.1%<br><b>Republican:</b> 48.4%<br><br><b>Race:</b> 64.1% White, 23.2% Am. Indian, 2.4% Black, 1.7% Asian<br><b>Ethnicity:</b> 20.4% Hispanic<br><br><b>Unemployment:</b> 14.2%<br><b>Median household income:</b> $43,377';
  const [activeState, setActiveState] = useContext(StateContext);
  const { isOpen, onOpen, onClose } = useDisclosure(); // open close state drawer

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

  /////////////////////// SERVER INTERACTIONS //////////////////////////////
  const handleStateFetch = async (map) => {
    const response = await fetch(
      `/stateFull/?state=${constants.stateMap[activeState].toLowerCase()}`
    );
    const body = await response.json();
    await setStateData(body);
    console.log(body);
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
    const stateData = await outlinesFetch();

    checkSrc('states', stateData['stateOutlines']);
    addPolygon('states', 'states', '#f8f8ff');

    checkSrc('arizona', stateData['az']);
    checkSrc('michigan', stateData['mi']);
    checkSrc('virginia', stateData['va']);
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
  const zoomIn = async (map, state) => {
    if (state == 'Arizona') {
      const stateData = await handleStateFetch();

      map.current.flyTo({
        center: [
          stateData['summary']['centerLon'],
          stateData['summary']['centerLat'],
        ],
        essential: true,
        zoom: 6.2,
      });

      checkSrc('azcd', stateData['districts']);
      checkSrc('azprecincts', stateData['precincts']);
      checkSrc('azcounty', stateData['counties']);
      addLayer('azprec-boundary', 'azprecincts', '#e6d1b5');
      addLayer('azcounty-boundary', 'azcounty', '#940f00');
      addLayer('azcd_lines', 'azcd', '#000000');

      onOpen();

      // AZ CONGRESSIONAL DISTRICT MARKERS
      const azd1 = createMarker(-110.7258455, 34.9691324, dummyMsg);
      const azd2 = createMarker(-109.9566824, 31.9274371, dummyMsg);
      const azd3 = createMarker(-112.4379116, 32.3667129, dummyMsg);
      const azd4 = createMarker(-113.2180629, 34.5988732, dummyMsg);
      const azd5 = createMarker(-111.7146593, 33.3377517, dummyMsg);
      const azd6 = createMarker(-111.890334, 33.6672906, dummyMsg);
      const azd7 = createMarker(-112.1190594, 33.4286611, dummyMsg);
      const azd8 = createMarker(-112.3000605, 33.6925203, dummyMsg);
      const azd9 = createMarker(-111.9492214, 33.4062567, dummyMsg);

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

      // MI CONGRESSIONAL DISTRICTS MARKERS
      const mid1 = createMarker(-86.4367294, 46.1633289, dummyMsg);
      const mid2 = createMarker(-86.3219007, 43.3968946, dummyMsg);
      const mid3 = createMarker(-85.2426928, 42.7156275, dummyMsg);
      const mid4 = createMarker(-85.2426928, 42.7156275, dummyMsg);
      const mid5 = createMarker(-83.4755262, 43.9135745, dummyMsg);
      const mid6 = createMarker(-86.1570905, 42.1675303, dummyMsg);
      const mid7 = createMarker(-84.3029212, 42.0958618, dummyMsg);
      const mid8 = createMarker(-83.941608, 42.6473743, dummyMsg);
      const mid9 = createMarker(-83.0505207, 42.5312343, dummyMsg);
      const mid10 = createMarker(-82.8710307, 43.4603655, dummyMsg);
      const mid11 = createMarker(-83.4568231, 42.5300018, dummyMsg);
      const mid12 = createMarker(-83.4482851, 42.2053809, dummyMsg);
      const mid13 = createMarker(-83.2511525, 42.3803814, dummyMsg);
      const mid14 = createMarker(-83.1507819, 42.3892242, dummyMsg);
      const mid15 = createMarker(-86.3928685, 42.6363171, dummyMsg);

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

      // VA CONGRESSIONAL DISTRICTS MARKERS
      const va1 = createMarker(-76.9800976, 37.8807201, dummyMsg);
      const va2 = createMarker(-75.9436791, 37.3936967, dummyMsg);
      const va3 = createMarker(-76.5714101, 36.9137548, dummyMsg);
      const va4 = createMarker(-77.1571007, 36.961749, dummyMsg);
      const va5 = createMarker(-78.7459185, 37.3323415, dummyMsg);
      const va6 = createMarker(-79.1953112, 38.136543, dummyMsg);
      const va7 = createMarker(-77.901421, 37.820184, dummyMsg);
      const va8 = createMarker(-77.1386215, 38.7790638, dummyMsg);
      const va9 = createMarker(-81.322201, 37.0008631, dummyMsg);
      const va10 = createMarker(-77.8358695, 39.076162, dummyMsg);
      const va11 = createMarker(-77.294837, 38.78906, dummyMsg);

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

    // michigan
    visibToggle('mi', 'n');

    // virginia
    visibToggle('va', 'n');
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
        setActiveState('Michigan');
      });
      map.current.on('click', 'virginia', (e) => {
        setActiveState('Virginia');
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
            stateSummary={stateData['summary']}
          />
        ) : null}
      </Flex>
    </>
  );
};
export default Map;
