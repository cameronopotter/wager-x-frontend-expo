import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native'

interface Props {
  isVisible: boolean
  onClose: () => void
}

export const WagerXGames: React.FC<Props> = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Background Overlay */}
      <Pressable className="flex-1 bg-black/50" onPress={onClose}>
        <View className="absolute bottom-0 h-[80%] w-full rounded-t-2xl bg-gray-900 p-6">
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} className="absolute left-4 top-4">
            <FontAwesome5 name="times" size={24} color="gray" />
          </TouchableOpacity>

          {/* Content */}
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold text-white">WagerX Games</Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}
