import React, { useState, createContext, useMemo } from 'react';

export const StateDataContext = createContext();

export const StateDataProvider = ({ children }) => {
  const [stateData, setStateData] = useState();

  return (
    <StateDataContext.Provider value={[stateData, setStateData]}>
      {children}
    </StateDataContext.Provider>
  );
};