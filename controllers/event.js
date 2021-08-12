/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:36:17
 * @LastEditTime : 2021-08-10 15:10:27
 * @Description  : 活动列表接口
 * @FilePath     : \decorate-admin-api\controllers\event.js
 */
const Common = require('./common')
const EventMoel = require('../models/event')
const ArticleModel = require('../models/article')
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
// 获取活动列表
function list(req, res) {
  const resObj = Common.clone(Constants.DEFAULT_SUCCESS)
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
        if (req.query.name) {
          whereCondition.name = req.query.name
        }
        EventMoel.findAndCountAll({
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [['created_at', 'DESC']],
          //  关联article表进行联表查询
          include: [
            {
              model: ArticleModel
            }
          ]
        })
          .then(function (result) {
            let list = []
            result.rows.forEach(v => {
              let obj = {
                id: v.id,
                name: v.name,
                img: v.img,
                articleId: v.articleId,
                url: v.url,
                createdAt: dateFormat(v.createdAt, 'yyyy-MM-dd HH:mm:ss')
              }
              if (v.Article) {
                obj.articleTitle = v.Article.title
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
// 获取单条活动
function info(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.params, ['id'], cb)
    },
    query: [
      'checkParams',
      (results, cb) => {
        EventMoel.findByPk(req.params.id)
          .then(function (result) {
            if (result) {
              resObj.data = {
                id: result.id,
                name: result.name,
                img: result.img,
                articleId: result.articleId,
                url: result.url,
                createdAt: dateFormat(result.createdAt, 'yyyy-MM-dd HH:MM:ss')
              }
              cb(null)
            } else {
              cb(Constant.EVENT_NOT_EXSIT)
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
// 添加活动
function add(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['name', 'img'], cb)
    },
    add: [
      'checkParams',
      (results, cb) => {
        EventMoel.create({
          name: req.body.name,
          img: req.body.img,
          articleId: req.body.articleId,
          url: req.body.url
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
// 修改活动
function update(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id', 'name', 'img'], cb)
    },
    update: [
      'checkParams',
      (results, cb) => {
        EventMoel.update(
          {
            name: req.body.name,
            img: req.body.img,
            articleId: req.body.articleId,
            url: req.body.url
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
              cb(Constant.EVENT_NOT_EXSIT)
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
// 删除活动
function remove(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id'], cb)
    },
    remove: [
      'checkParams',
      (results, cb) => {
        EventMoel.destroy({
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
              cb(Constant.EVENT_NOT_EXSIT)
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
