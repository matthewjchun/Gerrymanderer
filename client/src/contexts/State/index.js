import React, { useState, createContext, useMemo } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [activeState, setActiveState] = useState('Celtics');

  return (
    <StateContext.Provider value={[activeState, setActiveState]}>
      {children}
    </StateContext.Provider>
  );
};