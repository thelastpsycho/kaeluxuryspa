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
    console.log('[menuService] Starting getAllTreatments...')
    console.log('[menuService] DB initialized:', !!db)
    console.log('[menuService] Collection name:', COLLECTION_NAME)

    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('name'))
      console.log('[menuService] Query created, executing...')

      const querySnapshot = await getDocs(q)
      console.log('[menuService] Query executed, docs count:', querySnapshot.docs.length)

      const treatments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Treatment))

      console.log('[menuService] Treatments loaded successfully:', treatments.length)
      return treatments
    } catch (error: any) {
      // Enhanced error logging for Safari debugging
      console.error('[menuService] Firebase Error Details:', {
        code: error.code,
        message: error.message,
        name: error.name,
        stack: error.stack,
        userAgent: navigator.userAgent,
        hasIndexedDB: 'indexedDB' in window,
        cookiesEnabled: navigator.cookieEnabled,
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      })
      throw error
    }
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