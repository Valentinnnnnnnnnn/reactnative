import { useAuth } from '@/utils/AuthProvider'
import { useRouter } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

type Props = {}

function Index({}: Props) {
  const { user } = useAuth()
  const router = useRouter()

  const navToLogin = () => {
    router.push('/login')
  }

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <Button title="touch here" onPress={navToLogin} />
      {/* You can add a loading spinner or any other UI here */}
    </View>
  )
}

export default Index

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}
