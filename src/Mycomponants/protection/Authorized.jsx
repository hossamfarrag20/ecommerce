import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Authorized({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Token") != null) {
      navigate("/");  
    }
  }, [navigate]);

  if (localStorage.getItem("Token") == null) {
    return <>{children}</>;
  }

  return null;
}
