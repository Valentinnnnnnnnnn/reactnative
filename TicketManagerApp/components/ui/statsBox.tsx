import { statType } from '@/types/stat'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const StatsBox: React.FC<statType> = ({
  label,
  value,
  valueColor = '#333',
}) => {
  return (
    <View style={styles.box}>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    height: 150, // fixed height regardless of content
    borderWidth: 1,
    borderColor: '#ddd',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
})

export default StatsBox
