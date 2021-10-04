//import { reducer, initialState } from './reducer';
import React, { useState, createContext, useMemo } from 'react';

export const StateContext = createContext();
export const DataContext = createContext();

export const StateProvider = ({ children }) => {
  const [activeState, setActiveState] = useState('Celtics');
  const [geoJSONdata, setGeoJSONdata] = useState(null);

  return (
    <StateContext.Provider value={[activeState, setActiveState]}>
      <DataContext.Provider value={[geoJSONdata, setGeoJSONdata]}>
        {children}
      </DataContext.Provider>
    </StateContext.Provider>
  );
};
