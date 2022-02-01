import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { Menu } from './components/Menu/Menu'
import AppRouter from './routes/route'
import { getInvoices } from './redux/invoiceSlice'
import { useSelector, useDispatch } from 'react-redux'
import { saveUser } from './redux/authSlice'

function App() {
  const dispatch = useDispatch()
  const auth = getAuth()
  const user = useSelector((state) => state.auth.value)
  useEffect(async () => {
    dispatch(getInvoices())
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken))
      } else {
        dispatch(saveUser(undefined))
      }
    })
  }, [[auth, dispatch]])

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
