/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:17:19
 * @LastEditTime : 2021-08-10 15:09:23
 * @Description  : 管理员管理模块路由
 * @FilePath     : \decorate-admin-api\routes\admin.js
 */
const express = require('express')
const router = express.Router()

// 引入自定义controller
const AdminController = require('../controllers/admin')
// 定义管理员列表路由
router.get('/', AdminController.list)
// 定义单条管理员路由
router.get('/:id', AdminController.info)
// 定义添加管理员路由
router.post('/', AdminController.add)
// 定义修改管理员路由
router.put('/', AdminController.update)
// 定义删除管理员路由
router.delete('/', AdminController.remove)
module.exports = router
