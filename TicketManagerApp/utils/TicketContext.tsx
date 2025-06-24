import { TicketContextType } from '@/types/ticketContextType'
import { createContext } from 'react'

export const TicketContext = createContext<TicketContextType>({
  isLoading: false,
  tickets: [],
  loadTickets: async () => {},
})
