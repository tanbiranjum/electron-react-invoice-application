import { useState, useEffect } from 'react'
import { Menu } from './components/Menu/Menu'
import AppRouter from './routes/route'
import { getInvoices } from './redux/invoiceSlice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  useEffect(async () => {
    dispatch(getInvoices())
  }, [])

  return (
    <div className="App">
      <div className="flex">
        <Menu />
        <div className="p-10 w-full h-screen overflow-scroll bg-slate-50">
          <AppRouter />
        </div>
      </div>
    </div>
  )
}
export default App
