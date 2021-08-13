/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:37:12
 * @LastEditTime : 2021-08-10 15:10:32
 * @Description  : 预约接口
 * @FilePath     : \decorate-admin-api\controllers\order.js
 */
const Common = require('./common')
const OrdertMoel = require('../models/order')
const Constant = require('../constant/constant')
const dateFormat = require('dateformat')
const exportObj = {
  list,
  updateStatus
}
module.exports = exportObj
// 获取预约列表
function list(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.query, ['rows', 'page'], cb)
    },
    query: [
      'checkParams',
      (results, cb) => {
        // 从多少条开始查询
        let offset = req.query.rows * (req.query.page - 1) || 0
        // 查询多少条
        let limit = parseInt(req.query.rows) || 10
        //    设定一个查询条件对象
        let whereCondition = {}
        //  如果查询姓名存在，查询对象增加姓名
        if (req.query.name) {
          whereCondition.name = req.query.name
        }
        OrdertMoel.findAndCountAll({
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [['created_at', 'DESC']]
        })
          .then(function (result) {
            let list = []
            result.rows.forEach(v => {
              let obj = {
                id: v.id,
                name: v.name,
                phone: v.phone,
                type: v.type,
                orderDate: v.orderDate,
                message: v.message,
                status: v.status,
                createdAt: dateFormat(v.createdAt, 'yyyy-MM-dd HH:mm:ss')
              }
              list.push(obj)
            })
            resObj.data = {
              list,
              count: result.count
            }
            cb(null)
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
// 修改预约状态
function updateStatus(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id', 'status'], cb)
    },
    update: [
      'checkParams',
      (results, cb) => {
        OrdertMoel.update(
          {
            status: req.body.status
          },
          {
            where: {
              id: req.body.id
            }
          }
        )
          .then(function (result) {
            if (result[0]) {
              cb(null)
            } else {
              cb(Constant.ORDER_NOT_EXSIT)
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
