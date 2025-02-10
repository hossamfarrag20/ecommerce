import React, { createContext } from "react";

export const myMain = createContext();

export default function mainProvider() {
  return (
    <myMain.Provider>
      <div>main</div>
    </myMain.Provider>
  );
}
