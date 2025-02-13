import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface FooterTabProps {
  name: string;
  tabName: string;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export const FooterTab: React.FC<FooterTabProps> = ({
  name,
  tabName,
  selectedTab,
  setSelectedTab,
}) => {
  const IconComponent = name === 'wallet' ? FontAwesome5 : FontAwesome;

  return (
    <TouchableOpacity onPress={() => setSelectedTab(tabName)}>
      <IconComponent name={name} size={30} color={selectedTab === tabName ? 'white' : 'gray'} />
    </TouchableOpacity>
  );
};
