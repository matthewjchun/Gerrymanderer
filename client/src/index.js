import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ChakraProvider } from '@chakra-ui/react';
import { StateProvider } from './contexts/State';

import './index.css';
import App from './App';
import theme from './theme';
import { GeoJSONProvider } from './contexts/GeoJSON';
import { AlgorithmProvider } from './contexts/Algorithm';
import { StateDataProvider } from './contexts/StateData';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StateDataProvider>
      <AlgorithmProvider>
      <GeoJSONProvider>
      <StateProvider>
        <App />
      </StateProvider>
      </GeoJSONProvider>
      </AlgorithmProvider>
      </StateDataProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
