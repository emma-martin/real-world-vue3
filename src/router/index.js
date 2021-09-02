import ErrorDisplay from '@/views/ErrorDisplay.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EventDetail from '../views/event/Detail.vue'
import EventEdit from '../views/event/Edit.vue'
import EventLayout from '../views/event/Layout.vue'
import NotFound from '../views/event/NotFound.vue'
import EventRegister from '../views/event/Register.vue'
import EventCreate from '../views/EventCreate.vue'
import NetworkError from '../views/NetworkError.vue'
import SimpleForm from '../views/SimpleForm.vue'
import NProgress from 'nprogress'

const EventList = () =>
  import(/* webpackChunkName: "eventList" */ '../views/EventList.vue')
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')
const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetail',
        component: EventDetail,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
    ],
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
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { savedPosition, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
