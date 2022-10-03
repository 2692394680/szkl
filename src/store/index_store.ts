import { createPinia, defineStore } from 'pinia'
import Clipboard from 'clipboard'
import { MessagePlugin } from 'tdesign-vue-next'

const store = createPinia()
export { store }

export const useIndexStore = defineStore('indexStore', {
  state: () => ({

  }),
  actions: {
    async copyHandle(code) {
      const clipboard = new Clipboard('.copy', {
        text: function() {
          return code
        }
      })
      await clipboard.on('success', (e) => {
        console.log('复制成功', e)
        MessagePlugin.success('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      await clipboard.on('error', (e) => {
        // 不支持复制
        console.log('该浏览器不支持自动复制', e)
        MessagePlugin.error('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    }
  }
})
export const getIndexStore = () => useIndexStore(store)
export default store
