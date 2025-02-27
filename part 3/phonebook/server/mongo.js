const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://valenti:${password}@cluster0.yclqxnd.mongodb.net/`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({})
        .then((result) => {
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    })
        .catch(err => console.error(err));
} else if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name,
        number,
    });

    person.save()
        .then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    })
        .catch(err => console.error(err));
} else {
    console.log('Invalid number of arguments. Usage: node mongo.js <password> [name] [number]');
    mongoose.connection.close();
}