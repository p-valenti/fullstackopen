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
                    })
                    .catch(error => {
                        console.error('Error updating person:', error);
                        setErrorMessage({ message: `Information of '${newName}' has already been removed from the server`, type: 'error' });
                        setPersons(persons.filter(p => p.id !== personRepeated.id));
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
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
                })
                .catch(error => {
                    console.error('Error creating person:', error);
                    setErrorMessage({ message: `Failed to add '${newName}'`, type: 'error' });
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                });
        }
    }

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