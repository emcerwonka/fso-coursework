import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryFinder from './components/CountryFinder';
import Countries from './components/Countries'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const visibleCountries = searchTerm.length > 0
    ? countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : countries

  return (
    <div>
      <CountryFinder term={searchTerm} onChange={handleTermChange} />
      <Countries countries={visibleCountries} infoHandler={handleTermChange}/>
    </div>
  )
}

export default App;
