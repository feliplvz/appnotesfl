import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import configParams from '../../config/config.js';
import { useContext } from "react";
import { Context } from "../../context/context.jsx";
import PasswordModal from "../reset-password/PasswordModal.jsx";

const Login = () => {

  const { isAuthenticated, setIsAuthenticated, showAlert } = useContext(Context)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()

  const handleForgotPassword = async () => {
    setIsModalOpen(true); // Abre el modal cuando se hace clic en "Olvidé mi contraseña"
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };
    try {
      const response = await axios.post(`${configParams.API_URL}/login`, userData, {withCredentials: true});
      if(response.status === 200){
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', true); 
        navigate('dashboard');
      }
    } catch (error) {
      console.error(error);
      showAlert("Verifique su nombre de usuario y contraseña", "warning")
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white sm:w-96 shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="username"
            placeholder="Nombre de usuario"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <Link to="/register" 
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Signup
          </Link>
        </div>
        <div className="flex items-center justify-center mt-2">
          <button
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={handleForgotPassword}
          >
            Olvidaste tu contraseña?
          </button>
        </div>
      </form>
      <PasswordModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}/>
    </div>
  )
}

export default Login
