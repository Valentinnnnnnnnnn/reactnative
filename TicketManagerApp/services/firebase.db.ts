import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'
import { app } from '../config/firebase.config'

const db = getFirestore(app)

export async function getCities(db: ReturnType<typeof getFirestore>) {
  const citiesCol = collection(db, 'cities')
  const citySnapshot = await getDocs(citiesCol)
  const cityList = citySnapshot.docs.map((doc) => doc.data())
  return cityList
}
