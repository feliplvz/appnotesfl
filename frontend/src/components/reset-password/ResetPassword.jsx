import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import configParams from '../../config/config';
import { Context } from '../../context/context';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [ newPassword, setNewPassword ] = useState('');
  const { showAlert } = useContext(Context)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${configParams.API_URL}/reset-password`,
        { token, newPassword },{ withCredentials: true });

      if (response.status === 200) {
        showAlert("Su contraseña se ha modificado correctamente", "success")
        navigate("/")
      }
    } catch (error) {
      console.error(error);
      showAlert("Error en el cambio de contraseña", "warning")
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white sm:w-96 shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cambiar contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;