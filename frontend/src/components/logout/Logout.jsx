import {AiOutlineLogout} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import configParams from '../../config/config';
import { useContext } from 'react';
import { Context } from '../../context/context';
import Swal from 'sweetalert2';

const Logout = () => {

  const {setIsAuthenticated} = useContext(Context);

  const navigate = useNavigate()

  const handleLogOut = async () => {
    try{
      const result = await Swal.fire({
        title: '¿Desea cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        customClass: {
          popup: 'sm:max-w-sm',
          title: 'text-lg',
          content: 'text-sm',
          cancelButton: 'py-2 px-4 text-sm',
          confirmButton: 'py-2 px-4 text-sm',
        },
      });
      if (result.isConfirmed) {
        setIsAuthenticated(false)
        const response = await axios.get(`${configParams.API_URL}/logout`, {withCredentials: true});
        localStorage.removeItem('isAuthenticated');
        response.status === 200 && navigate('/');
      }
    }
    catch(err){
      console.error(err);
    }
  };
  return (
    <div onClick={handleLogOut}>
      <AiOutlineLogout title='Cerrar sesión' className='cursor-pointer' />
    </div>
  )
}

export default Logout
