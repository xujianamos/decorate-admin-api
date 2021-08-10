/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:40:40
 * @LastEditTime : 2021-08-10 15:02:19
 * @Description  : token验证的中间件
 * @FilePath     : \decorate-admin-api\routes\middleware\verify.js
 */
const Token = require('../../controllers/token')
const Constant = require('../../constant/constant')
const exportObj = {
  verifyToken
}
module.exports = exportObj
/**
 * @Author: xujian
 * @description: 验证token中间件
 * @param {*}
 * @return {*}
 */
function verifyToken(req, res, next) {
  //    如果请求路径是/login，即登陆页面，则跳过，继续下一步
  if (req.path === '/login') return next()
  //    从请求头中获取参数token
  let token = req.headers.token
  //    调用TokenController里的token解密方法，对参数token进行解密
  let tokenVerifyObj = Token.decrypt(token)
  if (tokenVerifyObj.token) {
    //  如果token验证通过，则继续下一步
    next()
  } else {
    //  如果token验证不通过，则返回错误json
    res.json(Constant.TOKEN_ERROR)
  }
}
