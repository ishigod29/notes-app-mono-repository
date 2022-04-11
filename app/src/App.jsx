import React,{useState, useEffect} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import {getAllNotes, createNotes, updateNotes, setToken} from './services/notes'
import {login} from './services/login'
import './App.css'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'


function App() {

  const [notes, setNotes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAllNotes().then(notes => {
      setNotes(notes)
    })
  },[])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  },[])

  const handleLogout = () => {
    setUser(null)
    setToken(user.token)
    localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (noteObject) => {
    createNotes(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    updateNotes(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        console.log(error)
        setError(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setError(null)
        }, 5000)   
      })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await login({
        username,
        password
      })

      localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    }catch(error){
      setError('Wrong Credentials')
      setTimeout(() => {
        setError(null)
      },5000)
    }  
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={error}/>

      {user === null && 
      <LoginForm 
        username={username} 
        password={password} 
        handleUsernameChange={(e) => setUsername(e.target.value)}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handleSubmit={handleLogin}>
      </LoginForm>}

      {user !== null && 
      <NoteForm
        addNote={addNote}
        handleLogout={handleLogout}>
      </NoteForm>}

      {user !== null && 
      <ol>{notes.map((note) => {
        return <Note key={note.id} note={note} toggleImportanceOf={() => toggleImportanceOf(note.id)}/>})}
      </ol>}

    </div>
  )
}

export default App
