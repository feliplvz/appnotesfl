import { FaTrashAlt } from 'react-icons/fa';
import { Context } from '../../context/context';
import { useContext } from 'react';

const RenderNotes = ({ handleNoteClick }) => {

  const { deleteNote, notes, searchValue } = useContext(Context);

	const filteredNotes = notes.filter((note) =>
	note.title.toLowerCase().includes(searchValue.toLowerCase())
	);

	const render = (notes) => {
		return notes.map((note) => (
			<div
				key={note._id}
				className={`${note.color} shadow rounded-lg cursor-pointer p-4 h-56 w-3/4 sm:w-full mx-auto`}
				onClick={() => {handleNoteClick(note)}}
			>
				<div className="flex flex-col justify-between h-full">
					<div>
						<h3 className="text-lg font-bold mb-2">{note.title}</h3>
						<p>{note.description}</p>
					</div>
					<div className="flex items-center justify-between pt-3 border-t border-gray-300">
						<p className="text-sm text-gray-500">{note.date}</p>
						<FaTrashAlt className='text-gray-500 hover:text-black cursor-pointer' title='Delete'
						onClick={(e) => (e.stopPropagation(), deleteNote(note._id))} />
					</div>
				</div>
			</div>
		));
	}

	return !searchValue ? render(notes) : render(filteredNotes);
}

export default RenderNotes
