import ErrorDisplay from '@/views/ErrorDisplay.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EventCreate from '../views/EventCreate.vue'
import EventDetail from '../views/EventDetail.vue'
import EventList from '../views/EventList.vue'
import SimpleForm from '../views/SimpleForm.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // perfomance optimization!!
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    props: true,
    component: EventDetail,
  },
  {
    path: '/form',
    name: 'SimpleForm',
    component: SimpleForm,
  },
  {
    path: '/event-create',
    name: 'EventCreate',
    component: EventCreate,
  },
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    props: true,
    component: ErrorDisplay,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
