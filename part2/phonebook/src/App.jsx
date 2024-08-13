import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas',
        number: '046-1211212'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)

        const nameRepeated = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
        if (nameRepeated) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
            }
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const shownPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(searchName.toLowerCase())
    })

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with
                <input
                    value={searchName}
                    onChange={handleSearchNameChange}/>
            </div>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name:
                    <input
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>number:
                    <input
                        value={newNumber}
                        onChange={handleNumberChange}
                    /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {shownPersons.map((person, index) => (
                    <li key={index}>{person.name}: {person.number}</li>
                ))}
            </ul>
            <div>debug: {newName}, {newNumber}</div>
        </div>
    )
}

export default App