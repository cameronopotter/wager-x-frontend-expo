import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import { login } from '../services/authService';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      setUser(user);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 px-6">
      <Image
        source={require('../assets/wagerx_logo_final_transparent.png')}
        className="-mt-96 mb-6 h-32 w-32"
        resizeMode="contain"
      />
      <Text className="mb-6 text-2xl font-bold text-white">Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        onChangeText={setEmail}
        className="mb-4 w-full rounded-lg bg-gray-800 p-4 text-white"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={setPassword}
        className="mb-6 w-full rounded-lg bg-gray-800 p-4 text-white"
      />

      <TouchableOpacity onPress={handleLogin} className="mb-4 w-full rounded-lg bg-blue-600 p-4">
        <Text className="text-center font-bold text-white">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text className="text-blue-400">Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};
