import { createRouter, createWebHistory   } from 'vue-router'
import homePage from '@/components/views/home-page'
import aboutPage from '@/components/views/about-page'
import favPage from '@/components/views/favorite-page.vue'
import settingsPage from '@/components/views/settings-page'


const routes = [
{path:'/',
component: homePage
},
{
  path:'/about',
  component:aboutPage
},
{
  path:'/settings',
  component:settingsPage
},
{
  path:'/favorite',
  component:favPage
},
]

const router = createRouter({
  history: createWebHistory (),
  routes
})

export default router
