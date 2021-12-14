import React, { useState, createContext } from 'react';

export const SelectedDistrictingContext = createContext();

export const SelectedDistrictingProvider = ({ children }) => {
  const [selectedDistricting, setSelectedDistricting] = useState();

  return (
    <SelectedDistrictingContext.Provider value={[selectedDistricting, setSelectedDistricting]}>
      {children}
    </SelectedDistrictingContext.Provider>
  );
};