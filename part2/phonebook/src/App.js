import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import AddNewPerson from './components/AddNewPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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
      setPersons(persons.concat(person))
      resetForms()
    }
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
      />
    </div>
  )
}

export default App