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
      return await api.app.reAuthenticate();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const authenticatedUserListener = () => {
    api.app.on("login", (auth) => {
      setUser(auth.user);
    });

    api.app.on("logout", () => {
      setUser(null);
    });

    // Event listener for other tabs when 'cisdord-auth' key in localStorage changes
    window.onstorage = async (event) => {
      if (event.key === "cisdord-auth") {
        if (event.newValue === null) {
          // No jwt token in localStorage. Not authenticated.
          setUser(null);
        } else {
          const auth = await reAuth();
          // Rerender again by setting the authenticated user
          // app.on('login') event listener does not always fire when in another tab
          setUser(auth.user);
        }
      }
    };
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
