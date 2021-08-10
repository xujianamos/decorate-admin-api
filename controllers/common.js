/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:36:49
 * @LastEditTime : 2021-08-10 13:54:16
 * @Description  : 公共方法
 * @FilePath     : \decorate-admin-api\controllers\common.js
 */
// 引入async模块
const async = require('async')
// 引入常量模块
const Constant = require('../constant/constant')
const exportObj = {
  clone,
  checkParams,
  autoFn,
  getImgUrl
}
module.exports = exportObj

/**
 * @Author: xujian
 * @description:克隆方法，生成一个默认成功的返回
 * @param {*}
 * @return {*}
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
/**
 * @Author: xujian
 * @description:校验参数全局方法
 * @param {object} params 请求的参数集
 * @param {Array} checkArr 需要验证的参数
 * @param {function} cb 回调
 * @return {*}
 */
function checkParams(params, checkArr, cb) {
  let flag = true
  checkArr.forEach(v => {
    if (!params[v]) {
      flag = false
    }
  })
  if (flag) {
    cb(null)
  } else {
    cb(Constant.LACK)
  }
}
/**
 * @Author: xujian
 * @description:返回统一方法，返回json格式数据
 * @param {*}tasks 当前controller执行tasks
 * @param {*}res 当前controller responese
 * @param {*}resObj 当前controller返回json对象
 * @return {*}
 */
function autoFn(tasks, res, resObj) {
  async.auto(tasks, function (err) {
    if (err) {
      console.log(JSON.stringify(err))
      res.json({
        code: err.code || Constant.DEFAULT_ERROR.code,
        msg: err.msg || JSON.stringify(err)
      })
    } else {
      res.json(resObj)
    }
  })
}
/**
 * @Author: xujian
 * @description: 获取图片URL的方法
 * @param {*} req 请求对象
 * @param {*} imgName 图片名称
 * @return {string} 图片url
 */
function getImgUrl(req, imgName) {
  //    获取当前域名，用于组装图片路径
  const imgPath = req.protocol + '://' + req.get('host')
  if (!imgName) {
    return ''
  } else {
    return imgPath + '/upload/' + imgName
  }
}
