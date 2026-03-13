import { db } from '../firebase'
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore'

export interface TreatmentOption {
  duration: string
  price: string
}

export interface Treatment {
  id?: string
  name: string
  description: string
  options: TreatmentOption[]
  image?: string
  category?: string
  featured?: boolean
}

const COLLECTION_NAME = 'treatments'

export const menuService = {
  async getAllTreatments(): Promise<Treatment[]> {
    const q = query(collection(db, COLLECTION_NAME), orderBy('name'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Treatment))
  },

  async addTreatment(treatment: Omit<Treatment, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), treatment)
    return docRef.id
  },

  async updateTreatment(id: string, treatment: Partial<Treatment>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, treatment)
  },

  async deleteTreatment(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  }
} 