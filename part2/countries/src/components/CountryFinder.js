import React from 'react'

const CountryFinder = ({ term, onChange }) => {
  return (
    <div>
      <form>
        Find countries: <input value={term} onChange={onChange} />
      </form>
    </div>
  )
}

export default CountryFinder