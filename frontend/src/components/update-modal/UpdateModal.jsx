import ReactModal from 'react-modal';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../context/context';
import axios from 'axios';
import configParams from '../../config/config';
import moment from 'moment';

const UpdateModal = ({ note, isOpen, setModalOpen }) => {
  const [editedNote, setEditedNote] = useState(note);
  const [hasChanges, setHasChanges] = useState(false);
  const {fetchNotes, noteColor, setNoteColor} = useContext(Context);

  useEffect(() => {
    if (note) {
      setEditedNote(note);
    }
  }, [note]);
  
  const updateNote = async (updatedNote) => {
    const noteData = {
      title: updatedNote.title,
      description: updatedNote.description,
      color: noteColor,
      date: moment().format('DD/MM/YYYY, h:mm:ss a'),
    }
    try {
      const response = await axios.post(`${configParams.API_URL}/update-note/${updatedNote._id}`, 
      noteData, {withCredentials: true});
      console.log(response.data);
      fetchNotes()
    }
    catch(err) {
      console.log(`Error updating note: ${err}`);
    }
  };

  const handleInputChange = (e) => {
    setEditedNote({
      ...editedNote,
      [e.target.name]: e.target.value,
    });
    setHasChanges(true);
  };

  const resetForm = () => {
    setHasChanges(false);
    setModalOpen(false);
  };

  const handleNoteUpdate = () => {
    updateNote(editedNote);
    resetForm()
  };

  return (
    <ReactModal 
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
          maxHeight: '60vh',
          margin: '0 auto',
        },
      }}
      isOpen={isOpen} onRequestClose={resetForm}>
        {note && (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Modificar nota</h2>
          <input
            className='shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-2 sm:w-64 w-60'
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleInputChange}
          />
          <textarea
            className='shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-2 sm:w-64 w-60 h-40 resize-none'
            name="description"
            value={editedNote.description}
            onChange={handleInputChange}
          />
          <select
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-2 sm:w-64 w-60"
          value={noteColor}
          onChange={(e) => {setNoteColor(e.target.value), setHasChanges(true)}}
          style={{color: "gray"}}
          >
            <option value="bg-white" disabled>Seleccionar color</option>
            <option value="bg-white">Blanco</option>
            <option value="bg-red-600">Rojo</option>
            <option value="bg-blue-700">Azul</option>
            <option value="bg-green-500">Verde</option>
            <option value="bg-yellow-500">Amarillo</option>
            <option value="bg-purple-700">Violeta</option>
            <option value="bg-pink-600">Rosa</option>
            <option value="bg-orange-500">Naranja</option>
          </select>
          <button
            className={`${
              hasChanges ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2`}
            onClick={handleNoteUpdate}
            disabled={!hasChanges}
          >
            Guardar cambios
          </button>
        </div>
      )}
    </ReactModal>
  );
};

export default UpdateModal;