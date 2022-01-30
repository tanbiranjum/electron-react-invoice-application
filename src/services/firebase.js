import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: 'react-invoice-application.firebaseapp.com',
  projectId: 'react-invoice-application',
  storageBucket: 'react-invoice-application.appspot.com',
  messagingSenderId: '744723925924',
  appId: '1:744723925924:web:4988d9cc24e1d46e0e4f31',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
