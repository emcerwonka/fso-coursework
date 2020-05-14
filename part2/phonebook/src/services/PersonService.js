import axios from 'axios'

const url = '/api/persons'

const getAllPersons = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const addNewPerson = newPerson => {
  const request = axios.post(url, newPerson)
  return request.then(response => {
    console.log(response)
    return response.data
  })
}

const deletePerson = id => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

const updatePerson = (changedPerson) => {
  const request = axios.put(`${url}/${changedPerson.id}`, changedPerson)
  return request.then(response => response.data)
}

export default {
  getAllPersons,
  addNewPerson,
  deletePerson,
  updatePerson
}