import { createContext, useState, useContext } from "react";

const Context = createContext();

export const contextProvider = () => {
  return useContext(Context);
};
export const ContextApi = ({ children }) => {
  const [section, setSection] = useState(null);
  const [images, setImages] = useState([]);
  const [dumps, setDumps] = useState([]);
  const [codeValidation, setCodeValidation] = useState(null);
  return (
    <Context.Provider
      value={{
        section,
        setSection,
        setImages,
        images,
        dumps,
        setDumps,
        codeValidation,
        setCodeValidation,
      }}
    >
      {children}
    </Context.Provider>
  );
};
