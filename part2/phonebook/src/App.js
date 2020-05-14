import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import AddNewPerson from './components/AddNewPerson'
import personService from './services/PersonService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    personService
      .getAllPersons()
      .then(initalPersons =>
        setPersons(initalPersons))
  }, [])

  const personsToShow = searchTerm.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(searchTerm))
    : persons

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addOrUpdatePerson = (event) => {
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const confirmed = window.confirm(
        `${existingPerson.name} already exists. Update their phone number?`
      )

      if (confirmed) {
        event.preventDefault()
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .updatePerson(changedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person => person.id !== existingPerson.id
                ? person
                : returnedPerson
              ))
            setNotification(`${changedPerson.name}'s phone number was updated.`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setErrorState(true)
            setNotification(error.response.data.error)
            setTimeout(() => {
              setNotification(null)
              setErrorState(false)
            }, 3000)
            console.log(error.response.data.error)
          })
      }
    } else {
      event.preventDefault()
      const person = {
        name: newName,
        number: newNumber
      }

      personService
        .addNewPerson(person)
        .then(returnedPerson => {
          console.log('Returned from PersonService: ', returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNotification(`${person.name} was added to the phonebook.`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          setErrorState(true)
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification(null)
            setErrorState(false)
          }, 3000)
          console.log(error.response.data.error)
        })
      resetForms()
    }
  }

  const removePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    const confirmed = window.confirm(`Delete ${personToDelete.name}?`)

    if (confirmed) {
      personService.deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`${personToDelete.name} was removed from the phonebook.`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          setErrorState(true)
          setNotification(`${personToDelete.name} no longer exists on the server.`)
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setNotification(null)
            setErrorState(false)
          }, 3000)
        })
    }
  }

  const resetForms = () => {
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} errorState={errorState} />
      <Filter searchTerm={searchTerm} handler={handleTermChange} />
      <h2>Add New Number</h2>
      <AddNewPerson
        submitHandler={addOrUpdatePerson}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsList={personsToShow}
        removeHandler={removePerson}
      />
    </div>
  )
}

export default App