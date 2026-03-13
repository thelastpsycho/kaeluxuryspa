import '../firebase'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { ref } from 'vue'

const auth = getAuth()
const currentUser = ref<User | null>(null)

// Initialize auth state listener
onAuthStateChanged(auth, (user) => {
  currentUser.value = user
})

export const authService = {
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error) {
      throw error
    }
  },

  async signOut() {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      throw error
    }
  },

  getCurrentUser() {
    return currentUser.value
  }
} 