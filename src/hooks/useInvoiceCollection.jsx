import { useState, useEffect } from 'react'
import { db } from '../services/firebase'
import { collection, getDocs } from 'firebase/firestore'

const useInvoiceCollection = () => {
  const [invoice, setInvoices] = useState([])
  useEffect(() => {
    async function fetchInvoices() {
      const dataCollection = collection(db, 'invoice')
      const result = await getDocs(dataCollection)
      const snapshot = result.docs.map((doc) => doc.data())
      setInvoices(snapshot)
    }
    fetchInvoices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return invoice
}

export default useInvoiceCollection
