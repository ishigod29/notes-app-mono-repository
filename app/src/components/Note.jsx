import React from 'react'

const Note = ({note, toggleImportanceOf}) => {
  const label = note.important ? 'is important' : 'is not important' 
  return (
    <li>
      <p>{note.content}</p>
      <button onClick={toggleImportanceOf}>{label}</button>
    </li>
  )
}

export default Note