import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext('');

const StudentAuth = (props) => {
  const [data, setData] = useState(localStorage.getItem('authData'));

 const saveData = (token, admNum) => {
    const newData = { token, admNum }; 
    setData(newData); 
    localStorage.setItem('authData', JSON.stringify(newData)); 
  };

 
  const deleteData = () => {
    setData(null); 
    localStorage.removeItem('authData'); 
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('authData'));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ data, saveData, deleteData }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default StudentAuth;
