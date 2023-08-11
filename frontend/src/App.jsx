import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/register/Register'
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import ResetPassword from './components/reset-password/ResetPassword';
import { Provider } from './context/context';

function App() {

  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path='register' element={<RegistrationForm />} />
          <Route path='/' element={<Login />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
