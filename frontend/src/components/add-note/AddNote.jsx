import { useState, useContext} from 'react';
import axios from 'axios';
import moment from 'moment';
import configParams from '../../config/config';
import AddModal from '../add-modal/AddModal';
import { Context } from '../../context/context';

const AddNote = ({fetchNotes}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const {noteColor, setNoteColor} = useContext(Context);

  const handleNoteSubmit = async (e) => {
      e.preventDefault();
      const noteData = {
        title: noteTitle,
        description: noteDescription,
        color: noteColor,
        date: moment().format('DD/MM/YYYY, h:mm:ss a'),
      };
    
      try {
        await axios.post(`${configParams.API_URL}/create-note`, noteData, 
        {withCredentials: true});
        setNoteTitle('');
        setNoteDescription('');
        setModalIsOpen(false);
        fetchNotes()
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <>
      <div className="bg-gray-200 w-3/4 sm:w-full mx-auto h-56 rounded-lg 
      flex flex-col items-center justify-center">
        <div className="text-3xl w-20 h-20 rounded-full border-2 border-dotted border-blue-500 
        flex items-center justify-center text-blue-500 cursor-pointer"
        onClick={() => setModalIsOpen(true)}>
            <button>+</button>
        </div>
        <p className="mt-2 text-center text-blue-500">Agregar nota</p>
      </div>
      <AddModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} handleNoteSubmit={handleNoteSubmit} 
      noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteDescription={noteDescription} 
      setNoteDescription={setNoteDescription} noteColor={noteColor} setNoteColor={setNoteColor} />
    </>
  )
}

export default AddNote
