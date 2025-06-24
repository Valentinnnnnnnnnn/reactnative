import { app, auth } from '@/config/firebase.config'
import { TicketType } from '@/types/ticket'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite'

export const db = getFirestore(app)

export async function getMyTickets() {
  try {
    const ticketsCollection = collection(db, 'tickets')
    const snapshot = await getDocs(ticketsCollection)
    const tickets = snapshot.docs.map((doc) => {
      const documentName = doc.ref.path.split('/').pop()
      return { id: documentName, ...doc.data() } as TicketType
    })
    const formattedTickets = tickets.filter((ticket) => {
      if (ticket.id === '') {
        console.error('Ticket ID is empty:', ticket)
        console.log(ticket)
        return false
      }
      return true
    })

    return formattedTickets
  } catch (error) {
    console.error('Error fetching tickets:', error)
    throw new Error('Error fetching tickets')
  }
}

export async function createTicket({ ticketData }: { ticketData: TicketType }) {
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
  ticketData,
  id,
}: {
  ticketData: TicketType
  id?: string
}): Promise<void> {
  try {
    if (!id) {
      throw new Error('Ticket id is required for update.')
    }
    const ticketRef = doc(db, 'tickets', id)
    await updateDoc(ticketRef, {
      ...ticketData,
      id: id,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error('Error updating ticket:', error)
    throw new Error('Error updating ticket')
  }
}

export async function getTicketById({
  id,
}: {
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

export async function getCommentsByTicketId({
  id,
}: {
  id: string
}): Promise<any[]> {
  try {
    const commentsCollection = collection(db, 'comments')
    const commentsQuery = query(
      commentsCollection,
      where('ticketId', '==', id),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(commentsQuery)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    }))
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw new Error('Error fetching comments')
  }
}

export async function createComment({
  ticketId,
  content,
  userId,
  createdAt,
}: {
  ticketId: string
  content: string
  userId: string
  createdAt?: Date
}) {
  try {
    if (auth.currentUser === null) {
      throw new Error('User must be authenticated to create a comment.')
    }

    createdAt = new Date()
    userId = auth.currentUser.email || 'unknown'

    const commentsCollection = collection(db, 'comments')
    await addDoc(commentsCollection, {
      ticketId,
      content,
      userId,
      createdAt,
    })
  } catch (error) {
    console.error('Error creating comment:', error)
    throw new Error('Error creating comment')
  }
}
