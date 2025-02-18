import { useNavigation } from '@react-navigation/native'
import React, { createContext, useState, useEffect } from 'react'
import { Animated } from 'react-native'

import { getUser, logout } from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigation = useNavigation() // Access navigation inside AuthContext

  useEffect(() => {
    const loadUser = async () => {
      try {
        const fetchedUser = await getUser()
        setUser(fetchedUser)
      } catch (error) {
        setUser(null)
      }
    }
    loadUser()
  }, [])

  const fadeAnim = new Animated.Value(1) // Initial opacity

  const handleLogout = async () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300, // Smooth fade-out
      useNativeDriver: true,
    }).start(async () => {
      await logout() // Perform actual logout
      setUser(null) // Clear user state

      // Reset navigation stack to only have LoginScreen with no animation
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login', params: { animation: 'none' } }],
      })
    })
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
