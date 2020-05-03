import React from 'react'

const Person = ({ name, number, id, removeHandler }) => {
  return (
    <p>{name} {number} <button onClick={() => removeHandler(id)}>remove</button></p>
  )
}

export default Person