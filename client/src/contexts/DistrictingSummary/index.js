import React, { useState, createContext } from 'react';

export const DistrictingSummaryContext = createContext();

export const DistrictingSummaryProvider = ({ children }) => {
  const [districtingSummary, setDistrictingSummary] = useState();

  return (
    <DistrictingSummaryContext.Provider value={[districtingSummary, setDistrictingSummary]}>
      {children}
    </DistrictingSummaryContext.Provider>
  );
};