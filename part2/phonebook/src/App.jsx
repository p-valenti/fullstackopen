import {useState, useEffect} from 'react';
import personService from '../services/persons';
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '046-1211212'
        }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchName, setSearchName] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

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

        const personRepeated = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        if (personRepeated) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const updatedPerson = {...personRepeated, number: newNumber};
                personService
                    .update(personRepeated.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== personRepeated.id ? person : returnedPerson));
                        setNewName('');
                        setNewNumber('');
                        setErrorMessage(`Updated '${returnedPerson.name}'`);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 3000);
                    });
            }
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
                    setErrorMessage(`Added '${newPerson.name}'`);
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000);
                });
        }
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id));
                });
        }
    };

    const shownPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(searchName.toLowerCase())
    })

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage}/>
            <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange}/>
            <Form
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons shownPersons={shownPersons} deletePerson={deletePerson}/>
        </div>
    )
}

export default App