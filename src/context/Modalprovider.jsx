import React, { createContext, useState } from "react";

export const modalcontext = createContext();

export default function ModaProvider({ children }) {
  const [descriptionMassege, setDescriptionMassege] = useState(null);
  const [btncontent,   setBtnContent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <modalcontext.Provider
      value={{
        descriptionMassege,
        setDescriptionMassege,
        setOpenModal,
        openModal,
        btncontent,
        setBtnContent
      }}
    >
      {children}
    </modalcontext.Provider>
  );
}
