import { Text, View } from 'react-native';

import { Header } from './HomeScreen/Header';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const Home = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Header path={path} />
    </View>
  );
};
