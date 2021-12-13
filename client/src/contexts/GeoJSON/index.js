import React, { useState, createContext, useMemo } from 'react';

export const GeoJSONContext = createContext();

export const GeoJSONProvider = ({ children }) => {
  const [geoJSON, setGeoJSON] = useState();

  return (
    <GeoJSONContext.Provider value={[geoJSON, setGeoJSON]}>
      {children}
    </GeoJSONContext.Provider>
  )
}