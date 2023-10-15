// AppContext.js
import { createContext, useContext } from 'react';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export { AppContext };
