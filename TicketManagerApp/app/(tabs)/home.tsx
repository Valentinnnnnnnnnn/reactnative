import StatsBox from '@/components/ui/statsBox'
import { getStats } from '@/services/db'
import { statType } from '@/types/stat'
import React from 'react'
import { View } from 'react-native'
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler'

export default function Home() {
  const [stats, setStats] = React.useState<statType[]>([])

  React.useEffect(() => {
    ;(async () => {
      const data = await getStats()
      setStats(data)
    })()
  }, [])

  const getColorByValue = (value: number): string => {
    if (value < 10) return '#008000'
    if (value < 30) return '#FFA500'
    return '#FF0000'
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 60,
          padding: 10,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {stats.map((stat, index) => (
          <View key={index} style={{ width: '50%' }}>
            <StatsBox
              label={stat.label}
              value={stat.value}
              valueColor={getColorByValue(stat.value)}
            />
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  )
}
