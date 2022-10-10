export const TABLE_COLUMNS = [
  {
    colKey: 'id',
    title: '组态ID',
    // 对齐方式
    align: 'center',
    // 设置列类名
    className: 'custom-column-class-name',
    // 设置列属性
    attrs: {
      'data-id': 'first-column'
    }
  },
  {
    colKey: 'name',
    title: '组态名称'
  }, {
    colKey: 'url',
    title: '组态路径'
  }, {
    colKey: 'deviceId',
    title: '设备ID'
  },
  // {
  //   colKey: 'deviceMac',
  //   title: '设备MAC'
  // },
  // {
  //   colKey: 'userId',
  //   title: '创建人'
  // },
  {
    colKey: 'createTime',
    title: '创建时间',
    sortType: 'all',
    sorter: true
  }, {
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
