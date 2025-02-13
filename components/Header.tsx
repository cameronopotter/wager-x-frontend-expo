import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

export const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View className="h-40 w-full flex-row items-center bg-gray-800 p-4">
      <View className="flex-1 items-start" />
      <Image
        source={require('../assets/wagerx_logo_final_transparent.png')}
        className="mt-14 h-20 w-20"
        resizeMode="contain"
      />
      <View className="flex-1 items-end">
        <TouchableOpacity className="mr-4 mt-14" onPress={() => navigation.navigate('Account')}>
          <FontAwesome name="user-circle" size={40} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
