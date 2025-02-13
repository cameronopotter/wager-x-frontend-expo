import { useNavigation } from '@react-navigation/native';
import React, { createContext, useState, useEffect } from 'react';

import { getUser, logout } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); // Access navigation inside AuthContext

  useEffect(() => {
    const loadUser = async () => {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
      } catch (error) {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Redirect to Login
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>{children}</AuthContext.Provider>
  );
};
