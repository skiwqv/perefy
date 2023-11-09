import { createRouter, createWebHistory   } from 'vue-router'
import homePage from '@/components/views/home-page'
import aboutPage from '@/components/views/about-page'

const routes = [
{path:'/',
component: homePage
},
{
  path:'/about',
  component:aboutPage
}
]

const router = createRouter({
  history: createWebHistory (),
  routes
})

export default router
