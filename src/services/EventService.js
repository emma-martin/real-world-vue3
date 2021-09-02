import axios from 'axios'
const apiClient = axios.create({
  // for external server call
  baseURL: 'https://my-json-server.typicode.com/emma-martin/real-world-vue3',
  // uncomment this for posting events and working locally
  // baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents(proxy, paginationObject) {
    return apiClient.get(
      '/events?_limit=' +
        paginationObject.perPage +
        '&_page=' +
        paginationObject.page
    )
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  },
}
