export const TABLE_COLUMNS = [
  {
    colKey: 'id',
    title: 'ID',
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
    title: '名称'
  }, {
    colKey: 'image',
    title: '图片'
  }, {
    colKey: 'location',
    title: '地址'
  }, {
    colKey: 'sn',
    title: 'SN'
  }, {
    colKey: 'mac',
    title: 'MAC'
  }, {
    colKey: 'brand',
    title: '品牌'
  }, {
    colKey: 'note',
    title: '备注'
  }, {
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

export const AUTH_TABLE_COLUMNS = [{
  colKey: 'id',
  title: 'ID',
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
  title: '名称'
}, {
  colKey: 'location',
  title: '地址'
}, {
  colKey: 'sn',
  title: 'SN'
}, {
  colKey: 'mac',
  title: 'MAC'
}, {
  colKey: 'brand',
  title: '品牌'
}, {
  colKey: 'note',
  title: '备注'
}, {
  colKey: 'createByUserName',
  title: '创建者名称'
}, {
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
}]

export const RECORD_TABLE_COLUMNS = [{
  colKey: 'id',
  title: 'ID',
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
  title: '名称'
}, {
  colKey: 'location',
  title: '地址'
}, {
  colKey: 'sn',
  title: 'SN'
}, {
  colKey: 'mac',
  title: 'MAC'
}, {
  colKey: 'brand',
  title: '品牌'
}, {
  colKey: 'note',
  title: '备注'
}, {
  colKey: 'createByUserName',
  title: '创建者名称'
}, {
  colKey: 'useAuthUserName',
  title: '使用者名称'
}, {
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
}]
