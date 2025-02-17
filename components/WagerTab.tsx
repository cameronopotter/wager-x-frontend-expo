import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';

import { CustomWager } from './Wager/CustomWager';
import { Sports } from './Wager/Sports';
import { VideoGames } from './Wager/VideoGames';
import { WagerXGames } from './Wager/WagerXGames';
import { AuthContext } from '../contexts/AuthContext';

export const WagerTab: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [isRealMoney, setIsRealMoney] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<'create' | 'incoming'>('create');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Default rank if none exists
  const rank = user?.rank ?? 'Bronze 3, Division 1';
  const [rankTitle, rankDivision] = rank.split(', ');

  const renderCategory = () => {
    switch (selectedCategory) {
      case 'wagerx':
        return <WagerXGames goBack={() => setSelectedCategory(null)} />;
      case 'video':
        return <VideoGames goBack={() => setSelectedCategory(null)} />;
      case 'sports':
        return <Sports goBack={() => setSelectedCategory(null)} />;
      case 'custom':
        return <CustomWager goBack={() => setSelectedCategory(null)} />;
      default:
        return (
          <View className="mt-6 flex-row flex-wrap justify-around">
            <TouchableOpacity
              className="m-2 ml-4 flex h-24 w-40 items-center justify-center rounded-lg bg-gray-700"
              onPress={() => setSelectedCategory('wagerx')}>
              <FontAwesome5 name="gamepad" size={24} color="white" />
              <Text className="mt-2 text-white">WagerX Games</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="m-2 mr-4 flex h-24 w-40 items-center justify-center rounded-lg bg-gray-700"
              onPress={() => setSelectedCategory('video')}>
              <FontAwesome5 name="playstation" size={24} color="white" />
              <Text className="mt-2 text-white">Video Games</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="m-2 ml-4 flex h-24 w-40 items-center justify-center rounded-lg bg-gray-700"
              onPress={() => setSelectedCategory('sports')}>
              <FontAwesome5 name="football-ball" size={24} color="white" />
              <Text className="mt-2 text-white">Sports</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="m-2 mr-4 flex h-24 w-40 items-center justify-center rounded-lg bg-gray-700"
              onPress={() => setSelectedCategory('custom')}>
              <FontAwesome5 name="plus" size={24} color="white" />
              <Text className="mt-2 text-white">Custom Wager</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View className="flex-1 bg-gray-900 p-4">
      {/* Header: Rank & Toggle Switch */}
      <View className="flex-row items-center justify-between rounded-lg bg-gray-800 p-4">
        <View className="flex-row items-center">
          <FontAwesome5 name="medal" size={24} color="gold" className="mr-2" />
          <View>
            <Text className="text-lg font-bold text-white">{rankTitle}</Text>
            <Text className="text-sm text-gray-400">{rankDivision}</Text>
          </View>
        </View>

        {/* Toggle Switch */}
        <View className="flex-row items-center">
          <Text
            className={`text-md mr-2 font-bold ${isRealMoney ? 'text-green-400' : 'text-gray-400'}`}>
            $
          </Text>
          <Switch
            value={isRealMoney}
            onValueChange={setIsRealMoney}
            thumbColor={isRealMoney ? 'green' : 'gray'}
          />
          <Text
            className={`text-md ml-2 font-bold ${!isRealMoney ? 'text-blue-400' : 'text-gray-400'}`}>
            ⭐
          </Text>
        </View>
      </View>

      {/* Tab Switcher */}
      <View className="mt-6 flex-row justify-around">
        <TouchableOpacity
          className={`rounded-lg px-6 py-2 ${selectedTab === 'create' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onPress={() => setSelectedTab('create')}>
          <Text className="font-bold text-white">Create Wager</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`rounded-lg px-6 py-2 ${selectedTab === 'incoming' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onPress={() => setSelectedTab('incoming')}>
          <Text className="font-bold text-white">Your Wagers</Text>
        </TouchableOpacity>
      </View>

      {/* Content Rendering */}
      <View className="mt-6 flex-1">
        {selectedTab === 'create' ? (
          renderCategory()
        ) : (
          <View className="items-center justify-center">
            <Text className="text-lg text-white">Incoming Wager from a Friend</Text>
          </View>
        )}
      </View>
    </View>
  );
};
