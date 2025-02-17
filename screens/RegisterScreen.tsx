import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import { register } from '../services/authService';

export const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const user = await register(name, username, email, dateOfBirth, password, passwordConfirm);
      setUser(user);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (error) {
      alert(error.message || 'Registration failed');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 px-6">
      <Image
        source={require('../assets/wagerx_logo_final_transparent.png')}
        className="mb-6 h-32 w-32"
        resizeMode="contain"
      />
      <Text className="mb-6 text-2xl font-bold text-white">Register</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="gray"
        onChangeText={setName}
        className="mb-4 w-full rounded-lg bg-gray-800 p-4 text-white"
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="gray"
        onChangeText={setUsername}
        className="mb-4 w-full rounded-lg bg-gray-800 p-4 text-white"
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        onChangeText={setEmail}
        className="mb-4 w-full rounded-lg bg-gray-800 p-4 text-white"
      />
      <TextInput
        placeholder="Date of Birth (YYYY-MM-DD)"
        placeholderTextColor="gray"
        onChangeText={setDateOfBirth}
        className="mb-4 w-full rounded-lg bg-gray-800 p-4 text-white"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={setPassword}
        className="mb-4 w-full rounded-lg bg-gray-800 p-4 text-white"
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={setPasswordConfirm}
        className="mb-6 w-full rounded-lg bg-gray-800 p-4 text-white"
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="mb-4 w-full rounded-lg bg-green-600 p-4">
        <Text className="text-center font-bold text-white">Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="text-blue-400">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};
