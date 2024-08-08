import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data);

const createPerson = (newObject) => axios.post(baseUrl, newObject).then(r => r.data);

const updatePerson = (id, changedObject) => axios.put(`${baseUrl}/${id}`, changedObject).then(r => r.data);

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`).then(r => r.data);

export default { getAll, createPerson, updatePerson, deletePerson };
