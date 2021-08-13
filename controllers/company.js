/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:37:01
 * @LastEditTime : 2021-08-10 15:10:24
 * @Description  : 查看企业信息接口
 * @FilePath     : \decorate-admin-api\controllers\company.js
 */
const Common = require('./common')
const CompanyMoel = require('../models/company')
const Constant = require('../constant/constant')
const dateFormat = require('dateformat')
const exportObj = {
  info,
  update
}
module.exports = exportObj
// 获取企业信息
function info(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.params, ['id'], cb)
    },
    query: [
      'checkParams',
      (results, cb) => {
        CompanyMoel.findByPk(1)
          .then(function (result) {
            if (result) {
              resObj.data = {
                id: result.id,
                name: result.name,
                address: result.address,
                tel: result.tel,
                intro: result.intro,
                longitude: result.longitude,
                latitude: result.latitude,
                createdAt: dateFormat(result.createdAt, 'yyyy-MM-dd HH:MM:ss')
              }
              cb(null)
            } else {
              cb(Constant.COMPANY_INFO_NOT_EXSIT)
            }
          })
          .catch(function (err) {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  Common.autoFn(tasks, res, resObj)
}
// 修改企业信息
function update(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['address', 'name', 'tel', 'intro', 'longitude', 'latitude'], cb)
    },
    update: [
      'checkParams',
      (results, cb) => {
        CompanyMoel.update(
          {
            name: req.body.name,
            address: req.body.address,
            tel: req.body.tel,
            intro: req.body.intro,
            longitude: req.body.longitude,
            latitude: req.body.latitude
          },
          {
            where: {
              id: 1
            }
          }
        )
          .then(function (result) {
            if (result[0]) {
              cb(null)
            } else {
              cb(Constant.COMPANY_INFO_NOT_EXSIT)
            }
          })
          .catch(function (err) {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  Common.autoFn(tasks, res, resObj)
}
