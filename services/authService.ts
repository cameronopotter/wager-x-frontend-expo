import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

// const API_URL = 'https://wager-x-backend-f8077d406fce.herokuapp.com/api';
const API_URL = 'http://wager-x-backend.test/api'

/**
 * Register a new user
 */
export const register = async (
  name: string,
  username: string,
  email: string,
  date_of_birth: string,
  password: string,
  password_confirmation: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      {
        name,
        username,
        email,
        date_of_birth,
        password,
        password_confirmation,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    // Store token
    await AsyncStorage.setItem('token', response.data.token)
    return response.data.user
  } catch (error: any) {
    console.error('Registration Error:', error.response?.data || error.message)
    throw error.response?.data || { message: 'Registration failed' }
  }
}

/**
 * Login a user
 */
export const login = async (identifier: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { identifier, password }, // Send `identifier` instead of `email`
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    // Store token
    await AsyncStorage.setItem('token', response.data.token)
    return response.data.user
  } catch (error: any) {
    console.error('Login Error:', error.response?.data || error.message)
    throw error.response?.data || { message: 'Login failed' }
  }
}

/**
 * Logout a user
 */
export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (!token) throw { message: 'No authentication token found' }

    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    await AsyncStorage.removeItem('token')
  } catch (error: any) {
    console.error('Logout Error:', error.response?.data || error.message)
    throw error.response?.data || { message: 'Logout failed' }
  }
}

/**
 * Get authenticated user data
 */
export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (!token) throw { message: 'No authentication token found' }

    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    return response.data
  } catch (error: any) {
    console.error('User Fetch Error:', error.response?.data || error.message)
    throw error.response?.data || { message: 'Failed to fetch user' }
  }
}
