export const REGISTER_RULES = {
  name: [{
    required: true,
    message: '用户名不能为空',
    type: 'error'
  }],
  phone: [{
    required: true,
    message: '手机号不能为空',
    type: 'error'
  }],
  code: [{
    required: true,
    message: '验证码不能为空',
    type: 'error'
  }],
  email: [{
    required: true,
    message: '邮箱不能为空',
    type: 'error'
  }],
  password: [{
    required: true,
    message: '密码不能为空',
    type: 'error'
  }, {
    validator: (val) => {
      const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.=_-])[A-Za-z\d$@$!%*?&.=_-]{8,}$/
      return reg.test(val)
    },
    message: '密码由至少8位大小写字母和特殊字符和数字组成',
    type: 'error'
  }],
  note: [
    { required: true, message: '备注不能为空', type: 'error' }
  ]
}
