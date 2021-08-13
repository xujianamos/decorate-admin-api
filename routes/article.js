/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:39:20
 * @LastEditTime : 2021-08-10 15:09:26
 * @Description  : 文章管理模块路由
 * @FilePath     : \decorate-admin-api\routes\article.js
 */
const express = require('express')
const router = express.Router()
// 引入自定义的controller
const ArticleController = require('../controllers/article')
// 定义文章列表路由
router.get('/', ArticleController.list)
// 定义单条文章路由
router.get('/:id', ArticleController.info)
// 定义添加文章路由
router.post('/', ArticleController.add)
// 定义修改文章路由
router.put('/', ArticleController.update)
// 定义删除文章路由
router.delete('/', ArticleController.remove)
module.exports = router
