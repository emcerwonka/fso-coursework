import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, please be more specific.</p>
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <ul>
      {countries.map(country =>
        <li key={country.name}>
          {country.name}
        </li>)}
    </ul>
  )
}


export default Countries