import React, { useState, createContext } from 'react';

export const StateSummaryContext = createContext();

export const StateSummaryProvider = ({ children }) => {
  const [stateSummary, setStateSummary] = useState();

  return (
    <StateSummaryContext.Provider value={[stateSummary, setStateSummary]}>
      {children}
    </StateSummaryContext.Provider>
  );
};