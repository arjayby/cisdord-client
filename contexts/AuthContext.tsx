import React, { createContext, useContext, useEffect, useState } from "react";
import api from "api";
import { UserType } from "types/user";

const AuthContext = createContext<
  Partial<{ user: UserType | null; isLoading: boolean }>
>({});

const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const reAuth = async () => {
    try {
      await api.app.reAuthenticate();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
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
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
