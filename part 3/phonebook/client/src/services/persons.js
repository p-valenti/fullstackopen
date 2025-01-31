import axios from 'axios'

// const baseUrl = 'https://server-phonebook.fly.dev/api/persons'
const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
}

const create = (newPerson) => {
    return axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
        .catch(error => {
            console.error('Error adding person:', error);
            throw error;
        });
}

const remove = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data);
}

const update = (id, updatedPerson) => {
    return axios
        .put(`${baseUrl}/${id}`, updatedPerson)
        .then(response => response.data);
}

export default { getAll, create, remove, update };