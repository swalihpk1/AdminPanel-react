import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminHomeScreen from './screens/Admin/AdminEmployeeList.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import AdminLoginScreen from './components/AdminLoginScreen.jsx'
import AdminUser from './screens/Admin/AdminCreateUser.jsx';
import AdminUserUpdate from './screens/Admin/AdminEditEmployee.jsx'
import Admindashboard from './screens/Admin/Admindashboard.jsx'

import store from './store.js'
import { Provider } from 'react-redux'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/admin' element={<AdminLoginScreen />} />
      <Route path='' element={<AdminPrivateRoute />}>
        <Route path='/admin/dashboard' element={< Admindashboard />} />
        <Route path='/admin/employeeList' element={<AdminHomeScreen />} />
        <Route path='/admin/editEmployee/:id' element={<AdminUserUpdate />} />
        <Route path='/admin/createEmployee' element={<AdminUser />} />
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>

)
