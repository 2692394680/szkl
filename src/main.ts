import { createApp } from 'vue'
import App from './App.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import '@/assets/iconfont/iconfont'

import router from '@/router/index_router'
import store from '@/store/index_store'
import TDesign from 'tdesign-vue-next'

import 'tdesign-vue-next/es/style/index.css'
import '@/styles/variable.less'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(TDesign)

app.component('SvgIcon', SvgIcon)

app.mount('#app')
