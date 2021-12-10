import React, { useState, createContext } from 'react';

export const AlgorithmContext = createContext();

export const AlgorithmProvider = ({ children }) => {
  const [algorithm, setAlgorithm] = useState();

  return (
    <AlgorithmContext.Provider value={[algorithm, setAlgorithm]}>
      {children}
    </AlgorithmContext.Provider>
  )
}