import { Text, View, Image } from 'react-native';

export const Header = ({ path }: { path: string }) => {
  return (
    <View className="absolute top-0 flex h-48 w-full items-center justify-center border-b border-gray-800 bg-gray-900">
      <Image
        source={require('../../assets/wagerx_logo_final_transparent.png')}
        className="mt-4 h-24 w-24"
        resizeMode="contain"
      />
    </View>
  );
};
