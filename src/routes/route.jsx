import { useRoutes } from 'react-router-dom'
import { Form } from '../pages/Form'
import { Invoices } from '../pages/Invoices'
import { Settings } from '../pages/Settings'
import { Invoice } from '../pages/Invoice'
import { Login } from '../pages/Login'

const AppRouter = () => {
  let element = useRoutes([
    {
      path: '',
      element: <Invoices />,
    },
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/create',
      element: <Form />,
    },
    {
      path: '/create/:id',
      element: <Form />,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/invoice/:id',
      element: <Invoice />,
    },
  ])
  return element
}

export default AppRouter
