import React,{useState, useRef} from 'react'
import Toggle from './Toggle'


const NoteForm = ({addNote, handleLogout}) => {
  const [newNote, setNewNote] = useState('')
  const [check, setCheck] = useState(false)

  const toggleRef = useRef()

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const handleImportant = (e) => {
    setCheck(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: check
    }

    addNote(noteObject)
    setNewNote('')
    toggleRef.current.toggleVisibility()
  }

  return (
    <>
      <Toggle buttonLabel='New Note' ref={toggleRef}>
        <h3>Create a new note</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={newNote}
            placeholder='Write yor note here' 
            onChange={handleChange} />
          <input 
            type="checkbox" 
            name="Important" 
            onChange={handleImportant}/>
          <label name="Important">Important</label>
          <button>Save</button>
        </form>
        <button onClick={handleLogout}>Log Out</button>
      </Toggle>
    </>
  )
}

export default NoteForm