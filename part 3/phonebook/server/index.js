const path = require('path');
// require('dotenv').config()
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const Person = require('./models/person')

// app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.static(path.join(__dirname, 'dist')));

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    // {
    //     "id": "1",
    //     "name": "Arto Hellas",
    //     "number": "040-123456"
    // },
    // {
    //     "id": "2",
    //     "name": "Ada Lovelace",
    //     "number": "39-44-5323523"
    // },
    // {
    //     "id": "3",
    //     "name": "Dan Abramov",
    //     "number": "12-43-234345"
    // },
    // {
    //     "id": "4",
    //     "name": "Mary Poppendieck",
    //     "number": "39-23-6423122"
    // }
];

// app.get('/', (request, response) => {
//     response.send(' ')
// });

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.get('/api/persons', (request, response) => {
    response.json(persons)
});

app.get('/info', (request, response) => {
    const currentTime = new Date().toLocaleString();
    const entriesNumber = persons.length;
    response.send(`<p>Phonebook has info for ${entriesNumber} persons <br/> ${currentTime} </p>`)
});

app.get('/api/persons/:id', (request, response, next) => {
    // const id = request.params.id
    // const person = persons.find(note => note.id === id)
    //
    // if (person) {
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }
    Person.find({})
        .then((persons) => {
            res.json(persons);
        })
        .catch((error) => next(error));
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body

    if (!name || !number) {
        return response.status(400).json({ error: 'Name and number are required' });
    }

    const existingName = persons.some(person => person.name === name);
    if (existingName) {
        return response.status(400).json({ error: 'Name must be unique' });
    }

    // const generatedId = Math.floor(Math.random() * 1000000);

    const newPerson = {
        // id: generatedId,
        name: name,
        number: number,
    }

    persons = persons.concat(newPerson);
    response.status(201).json(newPerson);
});

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

const PORT = process.env.PORT
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);