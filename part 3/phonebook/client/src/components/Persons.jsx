const Persons = ({ shownPersons, deletePerson }) => {
    return (
        <ul>
            {shownPersons.map(person => (
                <li key={person.id }>
                    {person.name}: {person.number}
                    <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
                </li>
            ))}
        </ul>
    )
}

export default Persons