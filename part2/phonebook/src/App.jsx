import {useState, useEffect} from 'react';
import personService from '../services/persons';
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas',
        number: '046-1211212'}
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            });
    }, [])

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
            };

            personService
                .create(personObject)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson));
                    setNewName('');
                    setNewNumber('');
                });
        }
    }

    const shownPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(searchName.toLowerCase())
    })

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
            <Form
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons shownPersons={shownPersons} />
        </div>
    )
}

export default App