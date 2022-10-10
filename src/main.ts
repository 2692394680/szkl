import { createApp } from 'vue'
import App from './App.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import '@/assets/iconfont/iconfont'
import '@/Permission'
import 'nprogress/nprogress.css'

import router from '@/router/index_router'
import store from '@/store/index_store'
import TDesign from 'tdesign-vue-next'

import 'tdesign-vue-next/es/style/index.css'
import '@/styles/variable.less'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import moment from 'moment'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(TDesign)

app.component(SvgIcon.name, SvgIcon)

app.config.globalProperties.formatDate = function(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
app.mount('#app')
