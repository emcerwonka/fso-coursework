import React from 'react'
import Person from './Person'

const Persons = ({ personsList, removeHandler }) => {
  return (
    <ul>
      {personsList.map(person =>
        <li key={person.id}>
          <Person 
            name={person.name} 
            number={person.number}
            id={person.id}
            removeHandler={removeHandler} />
        </li>
      )}
    </ul>
  )
}

export default Persons