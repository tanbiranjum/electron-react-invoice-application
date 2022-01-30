import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../services/firebase'

const incrementCounter = async (id) => {
  const docRef = doc(db, 'data', id)
  let invoiceNo = await getDoc(docRef).data().invoiceNo
  invoiceNo = invoiceNo * 1 + 1
  await setDoc(docRef, { invoiceNo })
  return invoiceNo
}

const initialState = {
  invoices: [],
  invoice: {},
}

export const getInvoices = createAsyncThunk('invoice/getInvoices', async () => {
  const dataCollection = collection(db, 'invoice')
  const result = await getDocs(dataCollection)
  const snapshot = result.docs.map((doc) => doc.data())
  return snapshot
})

export const getInvoice = createAsyncThunk('invoice/getInvoice', async (id) => {
  const invoicesRef = collection(db, 'invoice')
  const q = query(invoicesRef, where('id', '==', id))
  const docSnap = await getDocs(q)
  const result = docSnap.docs.map((doc) => doc.data())[0]
  console.log('Hi')
  console.log(result)
  return result
})

export const createInvoice = createAsyncThunk(
  'invoice/create',
  async (invoice) => {
    // const docRef = doc(db, 'data', 'JDYeuXgDeFh8fNqAh3Au')
    // let invoiceNo = await getDoc(docRef).data().invoiceNo
    // invoiceNo = invoiceNo * 1 + 1
    // await setDoc(docRef, { invoiceNo })
    // console.log(invoiceNo)
    // invoice.invoiceNo = invoiceNo
    await addDoc(collection(db, 'invoice'), invoice)
  }
)

export const deleteInvoice = createAsyncThunk('invoice/delete', async (id) => {
  let req = await deleteDoc(doc(db, 'invoice', id))
  console.log(req)
})

export const updateInvoice = createAsyncThunk(
  'invoice/update',
  async (id, data) => {
    const docRef = doc(db, 'invoice', id)
    await setDoc(docRef, data)
  }
)

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  extraReducers: {
    [getInvoices.fulfilled]: (state, { payload }) => ({
      ...state,
      invoices: payload,
    }),
    [getInvoice.fulfilled]: (state, { payload }) => ({
      ...state,
      invoice: payload,
    }),
  },
})

export default invoiceSlice.reducer
