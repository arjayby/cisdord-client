import api from "api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../types/user";

const AuthContext = createContext<{ user: UserType | null }>({ user: null });

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  const reAuth = async () => {
    try {
      const auth = await api.app.reAuthenticate();
      setUser(auth.user);
    } catch (e) {}
  };

  useEffect(() => {
    reAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
