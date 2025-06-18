export type TicketType = {
  id: string
  title: string
  status: 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  category: 'hardware' | 'software' | 'network' | 'access' | 'other'
}