import React, { useEffect, useRef, useState } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import loginService from './services/login'
import noteService from './services/notes'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel="l o g i n">
      <LoginForm
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const noteForm = () => (
    <Togglable buttonLabel="c r e a t e NOTE" ref={noteFormRef}>
      <NoteForm
        createNote={createNote}
      />
    </Togglable>
  )

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const createNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const returnedNote = await noteService
      .create(noteObject)

    setNotes(notes.concat(returnedNote))
  }

  const handleLogin = async (username, password) => {
    console.log(`App.handleLogin for ${username} with password ${password}`)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('Logging in with ', username, password)
  }

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' no longer exists on the server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in.</p>
          {noteForm()}
        </div>
      }

      <h2>Notes</h2>

      <div>
        <button onClick={toggleShowAll}>
          SHOW {showAll ? 'IMPORTANT' : 'ALL'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App