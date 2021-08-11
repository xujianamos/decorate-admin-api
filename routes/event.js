/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:39:11
 * @LastEditTime : 2021-08-10 15:09:41
 * @Description  : 活动管理模块路由
 * @FilePath     : \decorate-admin-api\routes\event.js
 */
const express = require('express')
const router = express.Router()
// 引入自定义的controller
const EventController = require('../controllers/event')
// 定义活动列表路由
router.get('/', EventController.list)
// 定义单条活动路由
router.get('/:id', EventController.info)
// 定义添加活动路由
router.post('/', EventController.add)
// 定义修改活动路由
router.put('/', EventController.update)
// 定义删除活动路由
router.delete('/', EventController.remove)
module.exports = router
