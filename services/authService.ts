import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://wager-x-backend.test/api';

export const register = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation,
    });
    await AsyncStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    throw error.response?.data || 'Registration failed';
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};

export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    await axios.post(`${API_URL}/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
    await AsyncStorage.removeItem('token');
  } catch (error) {
    throw error.response?.data || 'Logout failed';
  }
};

export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch user';
  }
};
