import { createContext, useState, useRef, useEffect } from "react";

const defaultValue = {
  user: null,
  error: "",
  checkAuth: true,
};

export const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(defaultValue);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
