import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  goBack: () => void;
}

export const CustomWager: React.FC<Props> = ({ goBack }) => {
  return (
    <View className=" flex-1 items-center justify-center bg-gray-900">
      <Text className="text-2xl font-bold text-white">Custom</Text>
    </View>
  );
};
