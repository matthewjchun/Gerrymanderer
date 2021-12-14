import React, { useState, createContext } from 'react';

export const PopulationTypeContext = createContext();

export const PopulationTypeProvider = ({ children }) => {
  const [populationType, setPopulationType] = useState(0);

  return (
    <PopulationTypeContext.Provider value={[populationType, setPopulationType]}>
      {children}
    </PopulationTypeContext.Provider>
  );
};