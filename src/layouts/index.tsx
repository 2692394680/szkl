import { defineComponent } from 'vue'
import { prefix } from '@/config/global'
import LayoutHeader from './componenets/LayoutHeader.vue'
import LayoutSidebar from './componenets/LayoutSidebar.vue'
import LayoutContent from './componenets/LayoutContent.vue'
import React from 'react'

const name = `${prefix}-base-layout`
export default defineComponent({
  name,
  setup() {
    const renderHeader = () => {
      return (<LayoutHeader/>)
    }
    const renderSidebar = () => {
      return (<LayoutSidebar/>)
    }
    const renderContent = () => {
      return (<LayoutContent/>)
    }
    return {
      renderHeader,
      renderSidebar,
      renderContent
    }
  },
  render() {
    const header = this.renderHeader()
    const sidebar = this.renderSidebar()
    const content = this.renderContent()
    return (
      <div>
        <t-layout>
          <t-header>{header}</t-header>
          <t-layout>
            <t-aside>{sidebar}</t-aside>
            <t-content>{content}</t-content>
          </t-layout>
        </t-layout>
      </div>
    )
  }
})
