//import { reducer, initialState } from './reducer';
import React, { useState, createContext } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [activeState, setActiveState] = useState('');

  return (
    <StateContext.Provider value={[activeState, setActiveState]}>
      {children}
    </StateContext.Provider>
  );
};
