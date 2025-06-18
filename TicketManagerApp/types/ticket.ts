export type TicketType = {
  id: string
  title: string
  description: string
  status: statusType
  priority: priorityType
  category: categoryType
  assignedTo?: string
  dueDate: string
  location?: string
  deviceInfo?: string
}

export type statusType = 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed'
export type priorityType = 'low' | 'medium' | 'high' | 'critical'
export type categoryType = 'hardware' | 'software' | 'network' | 'access' | 'other'
