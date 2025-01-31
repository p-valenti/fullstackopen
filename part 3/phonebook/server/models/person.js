const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(() => {
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phone = /^\d{2,3}-\d{5,}$/;

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    number: {
        type: String,
        required: [true, 'Phone is required'],
        validate: {
            validator: function (value) {
                return phone.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    }
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)