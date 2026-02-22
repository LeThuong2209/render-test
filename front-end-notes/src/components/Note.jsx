const Note = ({ note, toggleImportance, handleRemove }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={handleRemove}>Delete</button>
    </li>
  )
};

export default Note