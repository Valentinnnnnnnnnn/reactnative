import { app, auth } from '@/config/firebase.config'
import { TicketType } from '@/types/ticket'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore/lite'

export const db = getFirestore(app)

export async function getMyTickets(db: ReturnType<typeof getFirestore>) {
  try {
    const ticketsCollection = collection(db, 'tickets')
    const snapshot = await getDocs(ticketsCollection)
    const tickets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const formattedTickets = tickets.filter((ticket) => {
      if (ticket.id  === "") {
        console.error('Ticket ID is empty:', ticket)
        console.log(ticket)
        return false;
      }
      else {
        return true;
      }
    })

    return formattedTickets
  } catch (error) {
    console.error('Error fetching tickets:', error)
    throw new Error('Error fetching tickets')
  }
}

export async function createTicket({
  db,
  ticketData,
}: {
  db: ReturnType<typeof getFirestore>
  ticketData: TicketType
}) {
  try {
    if (auth.currentUser === null) {
      throw new Error('User must be authenticated to create a ticket.')
    }

    ticketData.createdAt = new Date()
    ticketData.updatedAt = new Date()
    ticketData.createdBy = auth.currentUser.email || 'unknown'

    const ticketsCollection = collection(db, 'tickets')
    const docRef = await addDoc(ticketsCollection, ticketData)
  } catch (error) {
    console.error('Error creating ticket:', error)
    throw new Error('Error creating ticket')
  }
}

export async function updateTicket({
  db,
  ticketData,
  id
}: {
  db: ReturnType<typeof getFirestore>
  ticketData: TicketType
  id?: string
}) {
  try {
    if (!id) {
      throw new Error('Ticket id is required for update.')
    }
    const ticketRef = doc(db, 'tickets', id)
    await updateDoc(ticketRef, {
      ...ticketData,
      id: id,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating ticket:', error)
    throw new Error('Error updating ticket')
  }
}

export async function getTicketById({
  db,
  id,
}: {
  db: ReturnType<typeof getFirestore>
  id: string
}): Promise<TicketType | null> {
  try {
    const ticketRef = doc(db, 'tickets', id)
    const ticketDoc = await getDoc(ticketRef)
    if (ticketDoc.exists()) {
      const data = ticketDoc.data()
      return { id: ticketDoc.id, ...data } as TicketType
    } else {
      console.error('No such ticket!')
      throw new Error('No ticket found with the given id.')
    }
  } catch (error) {
    console.error('Error fetching ticket by ID:', error)
    throw new Error('Error fetching ticket by ID')
  }
}