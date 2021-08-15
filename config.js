const config = {
  DEBUG: true,
  MYSQL: {
    host: 'localhost',
    database: 'decorate',
    username: 'test',
    password: '123456'
  }
}
if (process.env.NODE_ENV === 'production') {
  //    生成环境mysql数据库连接配置
  config.MYSQL = {
    host: 'localhost',
    database: 'decorate',
    username: 'test',
    password: '123456'
  }
}
module.exports = config
