import { createApp } from 'vue'
import App from './App.vue'

const app=createApp(App)

import router from './router/index_router'
import store from './store/index_store'
import TDesign from 'tdesign-vue-next'

import 'tdesign-vue-next/es/style/index.css';

app.use(router)
app.use(store)
app.use(TDesign)

app.mount('#app')
