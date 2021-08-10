/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:17:19
 * @LastEditTime : 2021-08-10 15:09:23
 * @Description  : file content
 * @FilePath     : \decorate-admin-api\routes\admin.js
 */
var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
