import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(personsToShow => {
        setPersons(personsToShow)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existedPerson = persons.find((person) => person.name === newName)
    if (existedPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the new number with the old one ?`)) {
        const updatePerson = {
          ...existedPerson,
          number: newNumber,
        }

        PersonService
          .update(existedPerson.id, updatePerson)
          .then(returnedObject => {
            setPersons(persons.map(p => p.id !== returnedObject.id ? p : returnedObject))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
      }

      PersonService
        .create(newObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      PersonService
        .remove(id)
        .then(returnedObject => {
          setPersons(persons.filter(p => p.id !== returnedObject.id))
        })
        .catch(error => {
          alert(`the name ${personToDelete.name} is already delelted from server!`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange= {handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App