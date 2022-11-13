import {createRouter,createWebHashHistory} from "vue-router"
import FirstExample from '../components/first-example'
import SecondExample from '../components/second-example'

const routes= [
  { path: '/', component: FirstExample },
  { path: '/example-1', component: FirstExample },
  { path: '/example-2', component: SecondExample },
]

const Router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

export default Router