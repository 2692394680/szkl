import { defineComponent } from 'vue'
import { prefix } from '@/config/global'
import LayoutHeader from './componenets/LayoutHeader.vue'
import LayoutSidebar from './componenets/LayoutSidebar.vue'
import LayoutContent from './componenets/LayoutContent.vue'
import LayoutFooter from './componenets/LayoutFooter.vue'

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
    const renderFooter = () => {
      return (<LayoutFooter/>)
    }
    return {
      renderHeader,
      renderSidebar,
      renderContent,
      renderFooter
    }
  },
  render() {
    const header = this.renderHeader()
    const sidebar = this.renderSidebar()
    const content = this.renderContent()
    const footer = this.renderFooter()
    return (
      <div>
        <t-layout>
          <t-header>{header}</t-header>
          <t-layout>
            <t-aside>{sidebar}</t-aside>
            <t-layout>
              <t-content>{content}</t-content>
              <t-footer>{footer}</t-footer>
            </t-layout>
          </t-layout>
        </t-layout>
      </div>
    )
  }
})
