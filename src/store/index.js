import EventService from '@/services/EventService.js'
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: 'Adam Jaar',
    events: [],
    event: {},
    totalEvents: 0,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    CLEAR_EVENTS(state) {
      state.events = null
    },
    SET_TOTAL_EVENTS(state, totalEvents) {
      state.totalEvents = totalEvents
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch((error) => {
          throw error
        })
    },
    fetchEvents({ commit }) {
      commit('CLEAR_EVENTS')
      return EventService.getEvents(...arguments)
        .then((response) => {
          commit('SET_EVENTS', response.data)
          commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
        })
        .catch((error) => {
          throw error
        })
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find(
        (event) => event.id === Number(id)
      )
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        return EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            throw error
          })
      }
    },
  },
  modules: {},
})
