import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export function CreateTicket() {
  return (
    <TouchableOpacity
      style={[styles.button, styles.bottomButton]}
      onPress={() => {
        console.log('Redirecting to create ticket')
      }}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>Créer un ticket</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
})
