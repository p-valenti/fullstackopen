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

app.use(express.static(path.join(__dirname, 'dist')));

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const requestLogger = (request, response, next) => {
    next()
}

app.use(requestLogger)

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons);
        })
        .catch(error => next(error));
});

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => {
            const currentTime = new Date().toLocaleString();
            response.send(`<p>Phonebook has info for ${count} persons <br/> ${currentTime}</p>`);
        })
        .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).json({ error: 'Person not found' });
            }
        })
        .catch(error => next(error));
})

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(deletedPerson => {
            if (!deletedPerson) {
                return response.status(404).json({ error: 'Person not found' });
            }
            response.status(204).end();
        })
        .catch(error => next(error));
})

app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body;

    if (!name || !number) {
        return response.status(400).json({ error: 'Name and number are required' });
    }

    const person = new Person({
        name,
        number,
    });

    person.save()
        .then(savedPerson => response.status(201).json(savedPerson))
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body;

    if (!name || !number) {
        return response.status(400).json({ error: 'Name and number are required' });
    }

    const updatedPerson = { name, number };

    Person.findByIdAndUpdate(
        request.params.id,
        updatedPerson,
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            if (!updatedPerson) {
                return response.status(404).json({ error: 'Person not found' });
            }
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});


app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use((error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
});

const errorHandler = (error, request, response, next) => {
    console.error('Error:', error.message);

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'Malformatted ID' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
});