import React from 'react'

const Filter = ({ searchTerm, handler }) => {
  return (
    <form>
      <div>
        Find by name: <input value={searchTerm} onChange={handler} />
      </div>
    </form>
  )
}

export default Filter