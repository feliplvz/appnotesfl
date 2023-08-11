import { useEffect, useState, useContext } from 'react';
import AddNote from '../add-note/AddNote';
import { Context } from '../../context/context';
import UpdateModal from '../update-modal/UpdateModal';
import RenderNotes from '../render-notes/RenderNotes';

const NoteContainer = () => {

  const {fetchNotes, isAuthenticated} = useContext(Context);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated]);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AddNote fetchNotes={fetchNotes} />
        <RenderNotes handleNoteClick={handleNoteClick}/>
      </div>
      {selectedNote &&
        <UpdateModal note={selectedNote} isOpen={modalOpen} setModalOpen={setModalOpen} />
      }
    </>
  );
};

export default NoteContainer;