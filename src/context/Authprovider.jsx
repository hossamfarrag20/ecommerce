import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function Authprovider({ children }) {
  const [userToken, setuserToken] = useState(null);

  useEffect(function () {
    const token = localStorage.getItem("Token");
    if (token) {
      setuserToken(token);
    }
  }, []);
  return (
    <>
      <authContext.Provider
        value={{
          setuserToken,
          userToken,
        }}
      >
        {children}
      </authContext.Provider>
    </>
  );
}
