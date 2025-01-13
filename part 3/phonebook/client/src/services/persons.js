import axios from 'axios'

// const baseUrl = 'https://server-phonebook.fly.dev/api/persons'
const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data);
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);
}

export default { getAll, create, remove, update };