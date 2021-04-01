import React, { createContext, useContext, useEffect, useState } from "react";
import api from "api";
import { UserType } from "types/user";

const AuthContext = createContext<{ user: UserType | null }>({ user: null });

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  const reAuth = async () => {
    try {
      await api.app.reAuthenticate();
    } catch (e) {}
  };

  const authenticatedUserListener = () => {
    api.app.on("authenticated", (auth) => {
      setUser(auth.user);
    });
  };

  useEffect(() => {
    authenticatedUserListener();
    reAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
