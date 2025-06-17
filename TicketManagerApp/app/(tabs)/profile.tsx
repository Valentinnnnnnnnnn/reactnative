import { auth } from '@/config/firebase.config'
import { router } from 'expo-router'
import { signOut } from 'firebase/auth'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Profile: React.FC = () => {
  const handleLogout = () => {
    signOut(auth)
    router.push('/login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Button title="Déconnexion" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

export default Profile
