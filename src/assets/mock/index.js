import Mock from 'mockjs'

// 會員登入列表
const memberLoginList = [{
  acc: 'abc',
  pwd: '123',
}]

// 會員登入
Mock.mock(('/api/member_login'), 'post', (options) => {
  const payload = JSON.parse(options.body)
  const findMemberData = memberLoginList
    .find(cur => cur.acc === payload?.acc && cur.pwd === payload?.pwd)

  const result = {
    status: (findMemberData) ? 'success' : 'error',
    result: [findMemberData],
  }
  return result
})

// 註冊新會員
Mock.mock(('/api/member_register'), 'post', (options) => {
  const payload = JSON.parse(options.body)
  memberLoginList.push({
    acc: payload?.acc,
    pwd: payload?.pwd,
  })
  const result = {
    status: (memberLoginList) ? 'success' : 'error',
    result: [memberLoginList],
  }
  return result
})
