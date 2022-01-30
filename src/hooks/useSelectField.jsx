import { useState, useEffect } from 'react'
import { db } from '../services/firebase'
import { collection, getDocs } from 'firebase/firestore'

const useSelectField = (type) => {
  const [selectField, setSelectField] = useState([])

  //retrieve selectField value from firebase
  useEffect(() => {
    async function fetchSelectFieldList() {
      const dataCollection = collection(db, 'data')
      const result = await getDocs(dataCollection)
      const snapshot = result.docs.map((doc) => doc.data()[`${type}`])
      setSelectField(snapshot)
    }
    fetchSelectFieldList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return selectField
}

export default useSelectField
