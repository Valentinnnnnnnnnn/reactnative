import { TicketType } from './ticket'

export type TicketContextType = {
  isLoading: boolean
  tickets: TicketType[]
  loadTickets: () => Promise<void>
}