import { BackTo } from '@/components/buttons/BackTo'
import { TicketForm } from '@/components/forms/ticketForm'
import { SafeAreaView, ScrollView } from 'react-native'

export default function CreateTicket() {
  return (
    <>
      <BackTo />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TicketForm />
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
