import { createContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import configParams from '../config/config';

export const Context = createContext();

export const Provider = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notes, setNotes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [noteColor, setNoteColor] = useState('');

  const dateConverter = (date) => {
    const parts = date.split(/[/, :]/);
    return `${parts[2]}/${parts[1]}/${parts[0]} ${parts[3]}:${parts[4]}:${parts[5]}`;
  }

  const compareDate = (a, b) => {
      const dateA = dateConverter(a.date);
      const dateB = dateConverter(b.date);

      if (dateA > dateB) {
          return -1;
      } else if (dateA < dateB) {
          return 1; 
      } else {
          return 0; 
      }
  }

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${configParams.API_URL}/get-notes`, { withCredentials: true });
      setNotes(response.data.sort(compareDate));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Está seguro que desea eliminar?',
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
        const response = await axios.delete(`${configParams.API_URL}/delete-note/${id}`, { withCredentials: true });
        console.log(response.data);
        fetchNotes();
        console.log('Elemento eliminado');
      }
    }
    catch(err) {
      console.log(`Error deleting the selected note: ${err}`);
    }
  }

  const showAlert = (text, icon) => {
    Swal.fire({
      text,
      icon,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: 'sm:max-w-sm',
        title: 'text-lg',
        content: 'text-sm',
      },
    });
  }

  return (
    <Context.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated, 
      fetchNotes, 
      deleteNote, 
      notes, 
      searchValue, 
      setSearchValue,
      showAlert,
      noteColor, 
      setNoteColor,
      }}>
      {children}
    </Context.Provider>
  );
};