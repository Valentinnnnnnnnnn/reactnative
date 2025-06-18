import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export function SubmitTicket({ editMode = false }: { editMode?: boolean }) {
  function handleSubmit() {
    // Logic to handle ticket submission
    console.log('Ticket submitted')
  }

  return (
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
      <Text style={styles.submitButtonText}>
        {editMode ? '✓ Update Ticket' : '+ Submit Ticket'}
      </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#3498db',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
})
