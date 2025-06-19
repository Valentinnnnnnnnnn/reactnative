import { TicketType } from '../types/ticket'

export async function getStats(
  tickets: TicketType[]
): Promise<{ label: string; value: number }[]> {
  try {
    if (!tickets || tickets.length === 0) {
      return [
        { label: 'Total Tickets', value: 0 },
        { label: 'New Tickets', value: 0 },
        { label: 'Assigned Tickets', value: 0 },
        { label: 'In-Progress Tickets', value: 0 },
        { label: 'Resolved Tickets', value: 0 },
        { label: 'Closed Tickets', value: 0 },
        { label: 'High Priority Tickets', value: 0 },
        { label: 'Medium Priority Tickets', value: 0 },
        { label: 'Low Priority Tickets', value: 0 },
        { label: 'Critical Priority Tickets', value: 0 },
        { label: 'Hardware Tickets', value: 0 },
        { label: 'Software Tickets', value: 0 },
        { label: 'Network Tickets', value: 0 },
        { label: 'Access Tickets', value: 0 },
        { label: 'Other Tickets', value: 0 },
      ]
    }

    const totalTickets = tickets.length
    const newTickets = tickets.filter(
      (ticket) => ticket.status === 'new'
    ).length
    const assignedTickets = tickets.filter(
      (ticket) => ticket.status === 'assigned'
    ).length
    const inProgressTickets = tickets.filter(
      (ticket) => ticket.status === 'in-progress'
    ).length
    const resolvedTickets = tickets.filter(
      (ticket) => ticket.status === 'resolved'
    ).length
    const closedTickets = tickets.filter(
      (ticket) => ticket.status === 'closed'
    ).length

    const highPriorityTickets = tickets.filter(
      (ticket) => ticket.priority === 'high'
    ).length
    const mediumPriorityTickets = tickets.filter(
      (ticket) => ticket.priority === 'medium'
    ).length
    const lowPriorityTickets = tickets.filter(
      (ticket) => ticket.priority === 'low'
    ).length
    const criticalPriorityTickets = tickets.filter(
      (ticket) => ticket.priority === 'critical'
    ).length

    const hardwareTickets = tickets.filter(
      (ticket) => ticket.category === 'hardware'
    ).length
    const softwareTickets = tickets.filter(
      (ticket) => ticket.category === 'software'
    ).length
    const networkTickets = tickets.filter(
      (ticket) => ticket.category === 'network'
    ).length
    const accessTickets = tickets.filter(
      (ticket) => ticket.category === 'access'
    ).length
    const otherTickets = tickets.filter(
      (ticket) => ticket.category === 'other'
    ).length

    const stats = [
      { label: 'Total Tickets', value: totalTickets },
      { label: 'New Tickets', value: newTickets },
      { label: 'Assigned Tickets', value: assignedTickets },
      { label: 'In-Progress Tickets', value: inProgressTickets },
      { label: 'Resolved Tickets', value: resolvedTickets },
      { label: 'Closed Tickets', value: closedTickets },
      { label: 'High Priority Tickets', value: highPriorityTickets },
      { label: 'Medium Priority Tickets', value: mediumPriorityTickets },
      { label: 'Low Priority Tickets', value: lowPriorityTickets },
      { label: 'Critical Priority Tickets', value: criticalPriorityTickets },
      { label: 'Hardware Tickets', value: hardwareTickets },
      { label: 'Software Tickets', value: softwareTickets },
      { label: 'Network Tickets', value: networkTickets },
      { label: 'Access Tickets', value: accessTickets },
      { label: 'Other Tickets', value: otherTickets },
    ]

    return stats
  } catch (error) {
    console.error('Error fetching stats:', error)
    throw new Error('Error fetching stats')
  }
}
