import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import AddNewPerson from './components/AddNewPerson'
import personService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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

  const addPerson = (event) => {
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`)
    } else {
      event.preventDefault()
      const person = {
        name: newName,
        number: newNumber
      }

      personService.addNewPerson(person).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      resetForms()
    }
  }

  const removePerson = (id) => {
    personService.deletePerson(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const resetForms = () => {
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handler={handleTermChange} />
      <h2>Add New Number</h2>
      <AddNewPerson
        submitHandler={addPerson}
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