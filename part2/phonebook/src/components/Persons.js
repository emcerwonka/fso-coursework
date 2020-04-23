import React from 'react'
import Person from './Person'

const Persons = ({ personsList }) => {
  return (
    <ul>
      {personsList.map(person =>
        <li key={person.name}>
          <Person name={person.name} number={person.number} />
        </li>
      )}
    </ul>
  )
}

export default Persons