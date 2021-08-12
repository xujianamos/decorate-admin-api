/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:17:19
 * @LastEditTime : 2021-08-10 15:09:43
 * @Description  : file content
 * @FilePath     : \decorate-admin-api\routes\index.js
 */
// 登录模块路由
const express = require('express')
const router = express.Router()
// 引入multer模块
const multer = require('multer')
// 引入token中间件
const verifyMiddleware = require('./middleware/verify')
// 创建文件上传中间件
const uploadMiddleware = multer()
// 引入自定义的controller
const IndexController = require('../controllers/index')
// 定义首页路由,get请求
router.get('/', function (req, res, next) {
  res.render('index', { title: 'express' })
})
// 定义登录路由，post请求
router.post('/login', IndexController.login)
// 定义上传图片路由，post请求
router.post('/upload', verifyMiddleware.verifyToken, uploadMiddleware.single('img'), IndexController.upload)
module.exports = router
