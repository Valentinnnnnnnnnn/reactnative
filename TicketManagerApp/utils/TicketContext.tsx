import { TicketContextType } from '@/types/TicketContextType'
import { createContext } from 'react'

export const TicketContext = createContext<TicketContextType>({
  isLoading: false,
  tickets: [],
  loadTickets: async () => {},
})
