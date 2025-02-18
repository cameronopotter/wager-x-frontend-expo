import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native'

interface Props {
  isVisible: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const WagerModal: React.FC<Props> = ({
  isVisible,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Background Overlay */}
      <Pressable className="flex-1" onPress={onClose}>
        <View className="absolute bottom-0 h-[80%] w-full rounded-t-2xl bg-gray-900 p-6">
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} className="absolute left-4 top-4">
            <FontAwesome5 name="times" size={24} color="gray" />
          </TouchableOpacity>

          {/* Title */}
          <Text className="text-center text-xl font-bold text-white">
            {title}
          </Text>

          {/* Content Area */}
          <View className="flex-1 items-center justify-center">{children}</View>
        </View>
      </Pressable>
    </Modal>
  )
}
