import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from './services/notes'
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNote] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNote(initialNotes)
      })
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };

    noteService
      .create(noteObject)
      .then(newNote => {
        setNote(notes.concat(newNote))
        setNewNote('')
      })
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  
  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
    const note = notes.find(n => n.id === id) 
    const changeNote = {...note, important: !note.important}

    noteService
      .update(id, changeNote)
      .then(returnedNote => {
        setNote(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNote(notes.filter(n => n.id !== id))
      })
  }

  const handleRemove = (id) => {
    const confirmDelete = window.confirm(`You want to delete this note?`)
    if (confirmDelete === false) {
      return
    }

    noteService
      .remove(id)
      .then(() => {
        setNote(notes.filter(note => note.id !== id))
      })
  }

  const noteToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            handleRemove={() => handleRemove(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer></Footer>
    </div>
  );
};

export default App;
