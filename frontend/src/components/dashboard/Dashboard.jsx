import NoteContainer from "../note-container/NoteContainer";
import { useContext, useEffect } from "react";
import { Context } from "../../context/context";
import { Navigate } from 'react-router-dom';
import SearchBar from "../search-bar/SearchBar";
import Logout from "../logout/Logout";

const Dashboard = () => {

  const localStorageAuthenticated = localStorage.getItem('isAuthenticated');

  const { isAuthenticated, fetchNotes } = useContext(Context);
  
  if (!isAuthenticated && localStorageAuthenticated !== 'true') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (localStorageAuthenticated === 'true') {
      fetchNotes();
    }
  }, []);

  return (
    <div className="container flex flex-col mx-auto py-4">
      <div className="flex items-center justify-between text-2xl w-3/4 sm:w-full font-bold mb-4 mx-auto">
        <h2>Notes</h2>
        <Logout />
      </div>
      <SearchBar />
      <NoteContainer />
    </div>
  )
}

export default Dashboard
