import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setUserToken(token);
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      const res = jwtDecode(userToken);
      setUserData(res);
    }
  }, [userToken]);

  return (
    <authContext.Provider
      value={{
        setUserToken,
        userToken,
        userData,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
