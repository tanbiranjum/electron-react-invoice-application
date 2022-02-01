import { useRoutes } from 'react-router-dom'
import { Form } from '../pages/Form'
import { Invoices } from '../pages/Invoices'
import { Settings } from '../pages/Settings'
import { Invoice } from '../pages/Invoice'
import { Login } from '../pages/Login'
import { useSelector } from 'react-redux'

const AppRouter = () => {
  const user = useSelector((state) => state.auth.value)
  const authCheck = (element) => {
    if (user) {
      return element
    }
    return <Login />
  }
  let element = useRoutes([
    {
      path: '',
      element: authCheck(<Invoices />),
    },
    {
      path: '/create',
      element: authCheck(<Form />),
    },
    {
      path: '/create/:id',
      element: authCheck(<Form />),
    },
    {
      path: '/settings',
      element: authCheck(<Settings />),
    },
    {
      path: '/invoice/:id',
      element: authCheck(<Invoice />),
    },
  ])
  return element
}

export default AppRouter
