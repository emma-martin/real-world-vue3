import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Vue-3-Forms',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  postForm(eventCreated) {
    return apiClient.post('/events', eventCreated)
  },
}
