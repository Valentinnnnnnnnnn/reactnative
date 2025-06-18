import { app } from '@/config/firebase.config'
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'

export const db = getFirestore(app)

export async function getMyTickets(db: ReturnType<typeof getFirestore>) {
  try {
    const ticketsCollection = collection(db, 'tickets')
    const snapshot = await getDocs(ticketsCollection)
    const tickets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return tickets
  } catch (error) {
    console.error('Error fetching tickets:', error)
    throw error
  }
}
