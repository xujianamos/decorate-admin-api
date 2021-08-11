/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:39:52
 * @LastEditTime : 2021-08-10 15:09:38
 * @Description  : 企业信息管理模块路由
 * @FilePath     : \decorate-admin-api\routes\company.js
 */
const express = require('express')
const router = express.Router()
// 引入自定义controller
const CompanyController = require('../controllers/company')
// 定义获取企业信息路由
router.get('/', CompanyController.list)
// 定义修改企业信息路由
router.put('/', CompanyController.update)
module.exports = router
