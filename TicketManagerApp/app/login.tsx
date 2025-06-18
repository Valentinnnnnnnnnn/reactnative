import { signIn } from '@/services/auth'
import React from 'react'
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native'

export default function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn(email, password)
    } catch (error) {
      setError(
        'Login failed. Please check your credentials or contact your administrator.'
      )
    }
    setIsLoading(false)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          if (error) setError(null)
          setEmail(text)
        }}
        editable={!isLoading}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          marginBottom: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          if (error) setError(null)
          setPassword(text)
        }}
        editable={!isLoading}
        secureTextEntry
        style={{
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 5,
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button
          title="Sign In"
          onPress={() => {
            if (error) setError(null)
            handleSignIn()
          }}
          disabled={isLoading}
        />
      )}
    </View>
  )
}
