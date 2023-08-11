import { useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import configParams from '../../config/config';
import { Context } from '../../context/context';

const PasswordModal = ({isModalOpen, handleCloseModal}) => {

  const [emailForReset, setEmailForReset] = useState('');
  const {showAlert} = useContext(Context);

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${configParams.API_URL}/forgot-password`, { email: emailForReset });
      if (response.status === 200) {
        showAlert('Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.', "success");
        handleCloseModal();
      }
    } catch (error) {
      console.error(error);
      showAlert('Ha ocurrido un error. Por favor, inténtalo nuevamente más tarde.', "warning");
    }
  };

  return (
    <Modal
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxWidth: '400px',
            width: '90%',
            padding: '2rem',
          },
        }}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Restablecer contraseña"
      >
      <div>
        <h2 className="text-xl font-semibold mb-4">Restablecer contraseña</h2>
        <p className="mb-4">Ingresa tu correo electrónico para restablecer la contraseña:</p>
        <input
          type="email"
          value={emailForReset}
          onChange={(e) => setEmailForReset(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500 mb-4"
        />
        <div className="flex justify-center">
          <button 
            onClick={handleResetPassword}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
          Enviar
          </button>
          <button 
            onClick={handleCloseModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400 focus:outline-none"
          > 
          Cancelar
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default PasswordModal
