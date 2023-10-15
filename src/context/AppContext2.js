import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { STUDENTS_API_URL } from "../constants";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [students, setStudents] = useState();

  const getStudents = async () => {
    try {
      const resp = await axios.get(STUDENTS_API_URL);
      setStudents(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <AppContext.Provider value={{ students, getStudents }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
