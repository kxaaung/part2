import { useState, useEffect } from 'react'
import CountryService from './services/CountryService'
import Country from './components/Country'

function App() {
  // const [keyword, setKeyword] = useState(null)
  const [countries, setCountries] = useState(null)
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    CountryService
      .getAll()
      .then(returnedCountries => {
        setCountries(returnedCountries)
      })
  }, [])

  const handleKeywordChange = (event) => {
    const searchKeyword = event.target.value
    setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(searchKeyword.toLowerCase())))
  }

  const detailOf = (name) => {
    setCountriesToShow(countries.filter(country => country.name.common === name))
  }

  if (countries === null) {
    return <p>countries list are not ready yet! Please wait ...</p>
  }

  return (
    <>
      find countries <input type="text" onChange={handleKeywordChange} />
      <Country countries={countriesToShow} detailOf={detailOf} />
    </>
  )
}

export default App
