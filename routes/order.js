/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:39:27
 * @LastEditTime : 2021-08-10 15:09:46
 * @Description  : 预约信息管理模块路由
 * @FilePath     : \decorate-admin-api\routes\order.js
 */
const express = require('express')
const router = express.Router()
// 引入自定义的controller
const OrderController = require('../controllers/order')
// 定义预约列表路由
router.get('/', OrderController.list)
// 定义修改预约状态路由
router.put('/status', OrderController.updateStatus)
module.exports = router
