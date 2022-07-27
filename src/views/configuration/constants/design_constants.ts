export const ELEMENT_LIBRARY = [
  {
    title: '基础组件',
    list: [{
      title: '文本框',
      type: 'textBox',
      handles: ['mr', 'ml'],
      width: 200,
      height: 40
    }, {
      title: '矩形',
      type: 'rectangle',
      color: '#ffc0c0'
    }, {
      title: '圆形',
      type: 'round',
      color: '#ffc0c0',
      lockAspectRatio: true
    }, {
      title: '表格',
      type: 'table'
    }]
  }, {
    title: '控制组件',
    list: [{
      title: '开关',
      type: 'switch',
      height: 40,
      width: 50,
      resizable: false
    }, {
      title: '按钮',
      type: 'button',
      handles: ['mr', 'ml'],
      value: '按钮',
      width: 100,
      height: 40
    }]
  }
]
