import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "./assets/css/style.css"

import Unicon from 'vue-unicons'
import { uniHome, uniMusic, uniFolderHeart, uniSetting } from 'vue-unicons/dist/icons'

Unicon.add([uniHome, uniMusic, uniFolderHeart, uniSetting])


createApp(App).use(router).use(Unicon).mount('#app')
