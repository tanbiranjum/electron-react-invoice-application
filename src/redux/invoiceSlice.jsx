import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
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
  let invoices = []
  result.docs.forEach((doc) => {
    invoices.push({ id: doc.id, ...doc.data() })
  })
  return invoices
})

export const getInvoice = createAsyncThunk('invoice/getInvoice', async (id) => {
  const docSnap = await getDoc(doc(db, 'invoice', id))
  const result = { id: docSnap.id, data: docSnap.data() }
  return result
})

export const createInvoice = createAsyncThunk(
  'invoice/create',
  async (invoice) => {
    await addDoc(collection(db, 'invoice'), invoice)
  }
)

export const deleteInvoice = createAsyncThunk('invoice/delete', async (id) => {
  let req = await deleteDoc(doc(db, 'invoice', id))
})

export const updateInvoice = createAsyncThunk(
  'invoice/update',
  async (data) => {
    try {
      const docRef = doc(db, 'invoice', data.id)
      await updateDoc(docRef, data.updatedValue)
    } catch (error) {
      console.log(error)
    }
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
