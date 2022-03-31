import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './layouts/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import Projects from './pages/Projects';

import { AuthProvider }  from './context/AuthProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />} >
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forget-password' element={<ForgetPassword />} />
            <Route path='forget-password/:token' element={<NewPassword />} />
            <Route path='confirm/:id' element={<ConfirmAccount />} />
          </Route>

          <Route path='/projects' element={<ProtectedRoute />}>
            <Route index element={<Projects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
