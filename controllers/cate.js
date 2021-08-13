/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:36:37
 * @LastEditTime : 2021-08-10 15:10:19
 * @Description  : 分类列表接口
 * @FilePath     : \decorate-admin-api\controllers\cate.js
 */
const Common = require('./common')
const CateMoel = require('../models/cate')
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
// 获取分类列表
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
        // 设定搜索对象
        let searchOption
        if (req.query.dropList) {
          searchOption = {
            order: [['created_at', 'desc']]
          }
        } else {
          //    如果没有传入，则分页查询
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
          searchOption = {
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['created_at', 'DESC']]
          }
        }

        CateMoel.findAndCountAll(searchOption)
          .then(function (result) {
            let list = []
            result.rows.forEach(v => {
              let obj = {
                id: v.id,
                name: v.name,
                img: v.img,
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
// 获取单条分类
function info(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.params, ['id'], cb)
    },
    query: [
      'checkParams',
      (results, cb) => {
        CateMoel.findByPk(req.params.id)
          .then(function (result) {
            if (result) {
              resObj.data = {
                id: result.id,
                name: result.name,
                img: result.img,
                createdAt: dateFormat(result.createdAt, 'yyyy-MM-dd HH:MM:ss')
              }
              cb(null)
            } else {
              cb(Constant.CATE_NOT_EXSIT)
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
// 添加分类
function add(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['name', 'img'], cb)
    },
    add: [
      'checkParams',
      (results, cb) => {
        CateMoel.create({
          name: req.body.name,
          img: req.body.img
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
// 修改分类
function update(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id', 'name', 'img'], cb)
    },
    update: [
      'checkParams',
      (results, cb) => {
        CateMoel.update(
          {
            name: req.body.name,
            img: req.body.img
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
              cb(Constant.CATE_NOT_EXSIT)
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
// 删除分类
function remove(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id'], cb)
    },
    remove: [
      'checkParams',
      (results, cb) => {
        CateMoel.destroy({
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
              cb(Constant.CATE_NOT_EXSIT)
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
