import {useState, useEffect} from 'react';
import personService from './services/persons';
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchName, setSearchName] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        axios
            .get('/api/persons')
            .then(response => {
                console.log(response.data);
                setPersons(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setErrorMessage({ message: 'Failed to load persons from the server', type: 'error' });
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
    }, []);

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
        event.preventDefault();

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
                setErrorMessage({ message: `Added '${newPerson.name}'`, type: 'success' });
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            })
            .catch(error => {
                console.error('Error creating person:', error);
                setErrorMessage({ message: `Failed to add '${newName}'`, type: 'error' });
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
    };

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id));
                    setErrorMessage({ message: `Deleted '${name}'`, type: 'success' });
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error deleting person:', error);
                    setErrorMessage({ message: `Failed to delete '${name}'`, type: 'error' });
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                });
        }
    };

    const shownPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(searchName.toLowerCase())
    })

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage?.message} type={errorMessage?.type} />
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