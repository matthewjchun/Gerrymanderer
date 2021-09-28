import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ChakraProvider } from '@chakra-ui/react';
import { StateProvider } from './contexts/State';

import './index.css';
import App from './App';
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StateProvider>
        <App />
      </StateProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
