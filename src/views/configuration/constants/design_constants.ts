export const ELEMENT_LIBRARY = [
  {
    title: '基础组件',
    list: [{
      title: '文本框',
      type: 'textBox',
      value: '文本框',
      handles: ['mr', 'ml'],
      w: 200,
      h: 34,
      textColor: '#000000',
      bgColor: '#ffffff',
      radius: 0
    }, {
      title: '矩形',
      type: 'rectangle',
      bgColor: '#45869D',
      radius: 0
    }, {
      title: '圆形',
      type: 'round',
      bgColor: '#45869D',
      lockAspectRatio: true,
      radius: undefined
    }, {
      title: '表格',
      type: 'table'
    }]
  }, {
    title: '控制组件',
    list: [{
      title: '开关',
      type: 'switch',
      value: true,
      h: 29,
      w: 50,
      resizable: false,
      lockAspectRatio: true
    }, {
      title: '按钮',
      type: 'button',
      value: '按钮',
      handles: ['mr', 'ml'],
      w: 100,
      h: 40
    }]
  }
]
