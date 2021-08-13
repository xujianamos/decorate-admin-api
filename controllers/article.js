/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:36:23
 * @LastEditTime : 2021-08-10 15:10:14
 * @Description  : 文章列表接口
 * @FilePath     : \decorate-admin-api\controllers\article.js
 */
const Common = require('./common')
const ArticleModel = require('../models/article')
const CateModel = require('../models/cate')
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
// 获取文章列表
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
        if (req.query.title) {
          whereCondition.title = req.query.title
        }
        ArticleModel.findAndCountAll({
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [['created_at', 'DESC']],
          //  关联article表进行联表查询
          include: [
            {
              model: CateModel
            }
          ]
        })
          .then(function (result) {
            let list = []
            result.rows.forEach(v => {
              let obj = {
                id: v.id,
                title: v.title,
                cate: v.cate,
                cateName: v.Cate.name,
                cover: v.cover,
                createdAt: dateFormat(v.createdAt, 'yyyy-MM-dd HH:mm:ss')
              }
              if (v.desc) {
                obj.desc = v.desc.substr(0, 20) + '...'
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
// 获取单条文章
function info(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.params, ['id'], cb)
    },
    query: [
      'checkParams',
      (results, cb) => {
        ArticleModel.findByPk(req.params.id, {
          include: [
            {
              model: CateModel
            }
          ]
        })
          .then(function (result) {
            if (result) {
              resObj.data = {
                id: result.id,
                title: result.title,
                cate: result.cate,
                cateName: result.Cate.name,
                cover: result.cover,
                content: result.content,
                createdAt: dateFormat(result.createdAt, 'yyyy-MM-dd HH:MM:ss')
              }
              cb(null)
            } else {
              cb(Constant.ARTICLE_NOT_EXSIT)
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
// 添加文章
function add(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['title', 'cate', 'desc', 'cover', 'content'], cb)
    },
    add: [
      'checkParams',
      (results, cb) => {
        ArticleModel.create({
          title: req.body.title,
          cate: req.body.cate,
          desc: req.body.desc,
          cover: req.body.cover,
          content: req.body.content
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
// 修改文章
function update(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id', 'title', 'cate', 'desc', 'cover', 'content'], cb)
    },
    update: [
      'checkParams',
      (results, cb) => {
        ArticleModel.update(
          {
            title: req.body.title,
            cate: req.body.cate,
            desc: req.body.desc,
            cover: req.body.cover,
            content: req.body.content
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
              cb(Constant.ARTICLE_NOT_EXSIT)
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
// 删除文章
function remove(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id'], cb)
    },
    remove: [
      'checkParams',
      (results, cb) => {
        ArticleModel.destroy({
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
              cb(Constant.ARTICLE_NOT_EXSIT)
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
