import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import 'nprogress/nprogress.css'
import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const GlobalStore = reactive({
  flashMessage: '',
})

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

const app = createApp(App)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  app.component(componentName, componentConfig.default || componentConfig)
})

app.use(store).use(router).provide('GlobalStore', GlobalStore).mount('#app')
