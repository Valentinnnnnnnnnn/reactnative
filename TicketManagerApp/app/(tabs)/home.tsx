import StatsBox from '@/components/ui/statsBox'
import { statType } from '@/types/stat'
import { getStats } from '@/utils/Stats'
import { TicketContext } from '@/utils/TicketContext'
import React, { useContext } from 'react'
import { RefreshControl, View } from 'react-native'
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler'

export default function Home() {
  const { tickets, isLoading, loadTickets } = useContext(TicketContext)
  const [stats, setStats] = React.useState<statType[]>([])
  const [isCalculating, setIsCalculating] = React.useState(false)

  React.useEffect(() => {
    setIsCalculating(true)
    ;(async () => {
      const data = await getStats(tickets)
      setStats(data)
      setIsCalculating(false)
    })()
  }, [tickets])

  const getColorByValue = (value: number): string => {
    if (value < 10) return '#008000'
    if (value < 30) return '#FFA500'
    return '#FF0000'
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadTickets}
            colors={['grey']}
            progressBackgroundColor={'black'}
            enabled={!isCalculating || !isLoading}
            progressViewOffset={30}
          />
        }
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
