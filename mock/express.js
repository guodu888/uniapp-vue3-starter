// express_demo.js 文件
const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next()
})

app.post('/api/login', (req, res) => {
  res.send({
    code: 0,
    msg: '',
    data: {
      token: 'Token',
    },
  })
})

app.get('/api/user/info', (req, res) => {
  res.send({
    code: 0,
    msg: '',
    data: {
      nickname: '满脑的思绪',
      avatar: 'https://s2.loli.net/2023/01/30/thNH2dbqjzETlSK.jpg',
      roles: [{
        id: 1,
        role_name: 'admin',
      }, {
        id: 2,
        role_name: 'user',
      }],
    },
  })
})

app.listen(8081, () => {
  // eslint-disable-next-line no-console
  console.log('应用实例，访问地址为 http://127.0.0.1:8081')
})
