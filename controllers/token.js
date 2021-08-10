/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:37:18
 * @LastEditTime : 2021-08-10 14:55:11
 * @Description  : token处理方法
 * @FilePath     : \decorate-admin-api\controllers\token.js
 */
// 引入jsonwebtoken包
const jwt = require('jsonwebtoken')
const tokenKey = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const Token = {
  encrypt,
  decrypt
}
module.exports = Token
/**
 * @Author: xujian
 * @description: token加密方法
 * @param {*} data 需要加密在token中的数据
 * @param {*} time token的过期时间，单位：s
 * @return {*}返回一个token
 */
function encrypt(data, time) {
  return jwt.sign(data, tokenKey, { expiresIn: time })
}
/**
 * @Author: xujian
 * @description: 解密方法
 * @param {*} token 加密之后的token
 * @return {*} 返回对象
 */
function decrypt(token) {
  try {
    let data = jwt.verify(token, tokenKey)
    return {
      token: true,
      data: data
    }
  } catch (e) {
    return {
      token: false,
      data: e
    }
  }
}
