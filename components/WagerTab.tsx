import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Switch, Animated } from 'react-native';

import { CustomWager } from './Wager/CustomWager';
import { Sports } from './Wager/Sports';
import { VideoGames } from './Wager/VideoGames';
import { WagerXGames } from './Wager/WagerXGames';
import { AuthContext } from '../contexts/AuthContext';

export const WagerTab: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [isRealMoney, setIsRealMoney] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'create' | 'wagers'>('create');
  const [showRank, setShowRank] = useState<boolean>(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Animation for Rank popup

  const rank = user?.rank ?? 'Bronze 3, Division 1';
  const [rankTitle, rankDivision] = rank.split(', ');
  const balance = user?.balance ?? '0.00';
  const coinBalance = user?.coins ?? '0'; // Default to 0 coins

  // Handle Rank Popup Animation
  const toggleRankPopup = () => {
    if (showRank) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowRank(false));
    } else {
      setShowRank(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

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
          <View className="mt-6 space-y-4">
            {/* Top Row */}
            <View className="flex-row justify-center space-x-4">
              {renderCategoryButton('WagerX Games', 'gamepad', 'wagerx')}
              {renderCategoryButton('Video Games', 'playstation', 'video')}
            </View>
            {/* Bottom Row */}
            <View className="flex-row justify-center space-x-4">
              {renderCategoryButton('Sports', 'football-ball', 'sports')}
              {renderCategoryButton('Custom Wager', 'plus', 'custom')}
            </View>
          </View>
        );
    }
  };

  const renderCategoryButton = (label: string, icon: string, category: string) => (
    <TouchableOpacity
      className="flex h-28 w-40 items-center justify-center rounded-xl bg-gray-800 shadow-lg transition-all hover:bg-gray-700"
      onPress={() => setSelectedCategory(category)}>
      <FontAwesome5 name={icon} size={26} color="white" />
      <Text className="mt-3 text-lg font-semibold text-white">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-900 p-4">
      {/* Unified Header with Balance, Rank, and Switch */}
      <View className="flex-row items-center justify-between rounded-lg bg-gray-800 p-5 shadow-md">
        {/* Balance Display - Shows Real Money or Coins */}
        <View className="flex">
          <Text className="text-sm text-gray-400">
            {isRealMoney ? 'Your Balance' : 'Your Coins'}
          </Text>
          <Text
            className={`text-2xl font-bold ${isRealMoney ? 'text-green-400' : 'text-yellow-400'}`}>
            {isRealMoney ? `$${balance}` : `${coinBalance} Coins`}
          </Text>
        </View>

        {/* Rank Section (Tap to reveal text) */}
        <TouchableOpacity
          onPress={toggleRankPopup}
          className="relative -ml-6 flex w-16 items-center justify-center">
          <FontAwesome5 name="medal" size={30} color="gold" />

          {showRank && (
            <Animated.View
              style={{ opacity: fadeAnim }}
              className="absolute -top-14 left-1/2 w-36 -translate-x-1/2 items-center rounded-lg bg-black px-4 py-2 shadow-lg">
              <Text className="text-center font-semibold text-white">{rankTitle}</Text>
              <Text className="text-center text-sm text-gray-300">{rankDivision}</Text>
            </Animated.View>
          )}
        </TouchableOpacity>

        {/* Toggle Switch - Fully Yellow for Coins, Fully Green for Real Money */}
        <Switch
          value={isRealMoney}
          onValueChange={setIsRealMoney}
          thumbColor={isRealMoney ? 'bg-green-950' : '#FFD700'}
          trackColor={{ false: '#FFD700', true: '#32CD32' }} // Fully yellow for coins, fully green for real money
        />
      </View>

      {/* Tab Selection (Create Wager or Your Wagers) */}
      <View className="mt-6 flex-row justify-around">
        <TouchableOpacity
          className={`rounded-lg px-6 py-3 ${
            selectedTab === 'create' ? 'bg-blue-500' : 'bg-gray-700'
          } shadow-md transition-all`}
          onPress={() => setSelectedTab('create')}>
          <Text className="font-bold text-white">Create Wager</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`rounded-lg px-6 py-3 ${
            selectedTab === 'wagers' ? 'bg-blue-500' : 'bg-gray-700'
          } shadow-md transition-all`}
          onPress={() => setSelectedTab('wagers')}>
          <Text className="font-bold text-white">Your Wagers</Text>
        </TouchableOpacity>
      </View>

      {/* Hide content when "Your Wagers" is selected */}
      {selectedTab === 'create' && (
        <>
          {/* Back Button (Only if category selected) */}
          {selectedCategory && (
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)}
              className="mt-6 flex flex-row items-center">
              <FontAwesome5 name="arrow-left" size={20} color="white" />
              <Text className="ml-3 text-lg font-semibold text-white">Back</Text>
            </TouchableOpacity>
          )}

          {/* Content Rendering */}
          <View className="mt-6 flex-1">{renderCategory()}</View>
        </>
      )}
    </View>
  );
};
