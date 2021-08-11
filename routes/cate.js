/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:39:37
 * @LastEditTime : 2021-08-10 15:09:32
 * @Description  : 分类管理模块路由
 * @FilePath     : \decorate-admin-api\routes\cate.js
 */
const express = require('express')
const router = express.Router()
// 引入自定义controller
const CateController = require('../controllers/cate')
// 定义分类列表路由
router.get('/', CateController.list)
// 定义单条分类路由
router.get('/:id', CateController.info)
// 定义添加分类路由
router.post('/', CateController.add)
// 定义修改分类路由
router.put('/', CateController.update)
// 定义删除分类路由
router.delete('/', CateController.remove)
module.exports = router
