export const TABLE_COLUMNS = [
  {
    colKey: 'id',
    title: '用户ID',
    // 对齐方式
    align: 'center',
    // 设置列类名
    className: 'custom-column-class-name',
    // 设置列属性
    attrs: {
      'data-id': 'first-column'
    }
  }, {
    colKey: 'name',
    title: '用户名'
  }, {
    colKey: 'phone',
    title: '手机号'
  }, {
    colKey: 'email',
    title: '邮箱'
  }, {
    colKey: 'note',
    title: '备注'
  }, {
    width: 250,
    colKey: 'op',
    title: '操作',
    /**
     * 1.内容超出时，是否显示省略号。值为 true，则浮层默认显示单元格内容；
     * 2.值类型为 Function 则自定义浮层显示内容；
     * 3.值类型为 Object，则自动透传属性到 Popup 组件。
     */
    ellipsis: true
  }
]
