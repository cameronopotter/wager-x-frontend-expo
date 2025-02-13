import React from 'react';
import { View } from 'react-native';

import { FooterTab } from './FooterTab';

interface FooterProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <View className="h-28 flex-row items-center justify-around bg-gray-800 p-4">
      <FooterTab
        name="handshake-o"
        tabName="wager"
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <FooterTab
        name="retweet"
        tabName="feed"
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <FooterTab
        name="wallet"
        tabName="wallet"
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </View>
  );
};
