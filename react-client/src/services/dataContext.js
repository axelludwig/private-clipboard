import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [clips, setClips] = useState([]);

  const updateClips = newData => {
    setClips(newData);
  };

  return (
    <DataContext.Provider value={{ clips, updateClips }} >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);