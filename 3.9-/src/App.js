import { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson'
import FilterPersons from './components/FilterPersons'
import Persons from './components/Persons'
import Server from './services/personDB'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      Server
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(p => p.name === person.name).length > 0) {
      if (window.confirm(`${newName} is already in the phonebook. Replace number?`)) {
        const oldPerson = persons.find(p => p.name === newName)
        Server
        .update(oldPerson.id, {...oldPerson, number: newNumber})
        .then(newPerson => {
          setPersons(persons.map(p => (p.name === newName ? newPerson : p)))
          setErrorMessage(`Updated ${newName}!`)
        })
        .catch(error => {
          console.log(error)
          setPersons(persons.filter(p => p.name !== newName))
          setErrorMessage(`Update failed! ${newName} is already deleted!`)
        })
        setNewName('')
        setNewNumber('')
      }
    } else {
      Server
      .addNumber(person)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      setErrorMessage(`Added ${newName}!`)
      })
    }
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDeletePerson = (name, id) => {
    return () => {
      if(window.confirm(`Delete ${name}?`)) {
        Server
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setErrorMessage(`Deleted ${name}!`)
          setNewName('')
          setNewFilter('')
        })
        .catch(error => {
          console.log(error)
          setPersons(persons.filter(p => p.name !== name))
          setErrorMessage(`${name} is already deleted!`)
        })
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <br />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleDeletePerson={handleDeletePerson}/>
      <br/>
      <FilterPersons newFilter={newFilter} handleFilterChange={handleFilterChange} />
    </div>
  )

}

export default App