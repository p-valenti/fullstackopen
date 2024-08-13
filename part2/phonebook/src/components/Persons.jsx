const Persons = ({ shownPersons }) => {
    return (
        <ul>
            {shownPersons.map((person, index) => (
                <li key={index}>{person.name}: {person.number}</li>
            ))}
        </ul>
    )
}

export default Persons