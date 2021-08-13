/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:36:08
 * @LastEditTime : 2021-08-10 15:10:12
 * @Description  : 管理员列表接口
 * @FilePath     : \decorate-admin-api\controllers\admin.js
 */
const Common = require('./common')
const AdminMoel = require('../models/admin')
const Constant = require('../constant/constant')
const dateFormat = require('dateformat')
const exportObj = {
  list,
  info,
  add,
  update,
  remove
}
module.exports = exportObj
// 获取管理员列表
function list(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      // 如果传入了dropList参数，代表需要下拉列表，跳过分页
      if (req.query.dropList) {
        cb(null)
      } else {
        Common.checkParams(req.query, ['rows', 'page'], cb)
      }
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
        if (req.query.username) {
          whereCondition.username = req.query.username
        }
        AdminMoel.findAndCountAll({
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
                username: v.username,
                name: v.name,
                role: v.role,
                lastLoginAt: dateFormat(v.lastLoginAt, 'yyyy-MM-dd HH:mm:ss'),
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
// 获取单条管理员
function info(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.params, ['id'], cb)
    },
    query: [
      'checkParams',
      (results, cb) => {
        AdminMoel.findByPk(req.params.id)
          .then(function (result) {
            if (result) {
              resObj.data = {
                id: result.id,
                username: result.username,
                name: result.name,
                role: result.role,
                lastLoginAt: dateFormat(result.lastLoginAt, 'yyyy-MM-dd HH:mm:ss'),
                createdAt: dateFormat(result.createdAt, 'yyyy-MM-dd HH:mm:ss')
              }
              cb(null)
            } else {
              cb(Constant.ADMIN_NOT_EXSIT)
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
// 添加管理员
function add(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['name', 'username', 'role', 'password'], cb)
    },
    add: [
      'checkParams',
      (results, cb) => {
        AdminMoel.create({
          name: req.body.name,
          username: req.body.username,
          role: req.body.role,
          password: req.body.password
        })
          .then(function () {
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
// 修改管理员
function update(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id', 'name', 'username', 'role', 'password'], cb)
    },
    update: [
      'checkParams',
      (results, cb) => {
        AdminMoel.update(
          {
            name: req.body.name,
            username: req.body.username,
            role: req.body.role,
            password: req.body.password
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
              cb(Constant.ADMIN_NOT_EXSIT)
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
// 删除管理员
function remove(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id'], cb)
    },
    remove: [
      'checkParams',
      (results, cb) => {
        AdminMoel.destroy({
          where: {
            id: req.body.id
          }
        })
          .then(function (result) {
            //  删除结果处理
            if (result) {
              //  删除成功
              cb(null)
            } else {
              //  删除失败
              cb(Constant.ADMIN_NOT_EXSIT)
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
