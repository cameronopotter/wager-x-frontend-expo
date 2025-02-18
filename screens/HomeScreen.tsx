import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SocialTab } from '../components/SocialTab';
import { TournamentTab } from '../components/TournamentTab';
import { WagerModal } from '../components/Wager/WagerModal'; // Ensure it's imported
import { WagerTab } from '../components/WagerTab';
import { WalletTab } from '../components/WalletTab';
import { AuthContext } from '../contexts/AuthContext';

export const HomeScreen: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState<string>('wager');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const renderContent = () => {
    switch (selectedTab) {
      case 'wager':
        return <WagerTab setActiveCategory={setActiveCategory} />;
      case 'social':
        return <SocialTab />;
      case 'tournament':
        return <TournamentTab />;
      case 'wallet':
        return <WalletTab />;
      default:
        return null;
    }
  };

  return (
    <View className="relative flex-1 bg-gray-900">
      {/* Overlay (Ensures it covers the entire screen including header) */}
      {activeCategory && <View className="absolute inset-0 z-50 bg-black/50" />}

      <Header />
      <View className="flex-1">{renderContent()}</View>
      <Footer selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Unified Modal for All Categories */}
      {activeCategory && (
        <WagerModal
          isVisible={!!activeCategory}
          onClose={() => setActiveCategory(null)}
          title={activeCategory.replace(/^\w/, (c) => c.toUpperCase())} // Capitalize first letter
        >
          <View className="flex-1 items-center justify-center">
            <Text className="text-xl text-white">This is {activeCategory}</Text>
          </View>
        </WagerModal>
      )}
    </View>
  );
};
