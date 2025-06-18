import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export function BackTo() {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        alignSelf: 'flex-start',
        width: '100%',
      }}
    >
      <Text
        style={{
          textAlign: 'left',
          paddingLeft: 20,
          paddingTop: 5,
          color: '#007AFF',
          fontSize: 16,
        }}
      >
        {'< Back to tickets'}
      </Text>
    </TouchableOpacity>
  )
}
