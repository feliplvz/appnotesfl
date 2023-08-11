import ReactModal from 'react-modal';

const AddModal = ({ modalIsOpen, setModalIsOpen, handleNoteSubmit, noteTitle, setNoteTitle, 
  noteDescription, setNoteDescription, noteColor, setNoteColor }) => {
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
      isOpen={modalIsOpen}               
      onRequestClose={() => setModalIsOpen(false)}
      >
      <form onSubmit={handleNoteSubmit} className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Add New Note</h2>
          <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-2 sm:w-64 w-60"
          type="text"
          placeholder="Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          />
          <textarea
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-2 sm:w-64 w-60 h-40 resize-none"
          placeholder="Description"
          value={noteDescription}
          onChange={(e) => setNoteDescription(e.target.value)}
          />
          <select
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-2 sm:w-64 w-60"
          value={noteColor}
          onChange={(e) => setNoteColor(e.target.value)}
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
          <div className="flex justify-center">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              type="submit"
          >
              Submit
          </button>
          <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setModalIsOpen(false)}
          >
              Cancel
          </button>
          </div>
      </form>
    </ReactModal>
  )
}

export default AddModal
