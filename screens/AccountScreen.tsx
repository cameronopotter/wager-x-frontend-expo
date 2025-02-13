import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';

export const AccountScreen = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header Section */}
      <View className="h-40 w-full  bg-gray-800 p-4">
        <View className="mt-16 flex-row justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Account</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center">
        <Text className="mb-2 text-2xl font-bold text-white">{user?.name}</Text>

        <TouchableOpacity onPress={handleLogout} className="mt-6 w-full rounded-lg bg-red-600 p-4">
          <Text className="text-center font-bold text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
