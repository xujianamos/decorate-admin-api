/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:39:44
 * @LastEditTime : 2021-08-10 15:09:29
 * @Description  : 案例管理模块路由
 * @FilePath     : \decorate-admin-api\routes\case.js
 */
const express = require('express')
const router = express.Router()
// 引入自定义的controller
const CaseController = require('../controllers/case')
// 定义案例列表路由
router.get('/', CaseController.list)
// 定义单条案例路由
router.get('/:id', CaseController.info)
// 定义添加案例路由
router.post('/', CaseController.add)
// 定义修改案例路由
router.put('/', CaseController.update)
// 定义删除案例路由
router.delete('/', CaseController.remove)
module.exports = router
