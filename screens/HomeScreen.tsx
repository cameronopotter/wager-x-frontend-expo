import React, { useContext, useState } from 'react';
import { View } from 'react-native';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SocialTab } from '../components/SocialTab';
import { TournamentTab } from '../components/TournamentTab';
import { WagerTab } from '../components/WagerTab';
import { WalletTab } from '../components/WalletTab';
import { AuthContext } from '../contexts/AuthContext';

export const HomeScreen: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState<string>('wager');

  const renderContent = () => {
    switch (selectedTab) {
      case 'wager':
        return <WagerTab />;
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
    <View className="flex-1 bg-gray-900">
      <Header />
      <View className="flex-1">{renderContent()}</View>
      <Footer selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </View>
  );
};
