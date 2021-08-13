/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:37:24
 * @LastEditTime : 2021-08-10 15:10:29
 * @Description  : 登录操作和图片上传操作
 * @FilePath     : \decorate-admin-api\controllers\index.js
 */
const Common = require('./common')
const AdminModel = require('../models/admin')
const Constant = require('../constant/constant')
const dateFormat = require('dateformat')
const Token = require('./token')
const TOKEN_EXPIRE_SENCOND = 3600
const fs = require('fs')
const path = require('path')
const exportObj = {
  login,
  upload
}
module.exports = exportObj
// 登录方法
function login(req, res) {
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['username', 'password'], cb)
    },
    query: [
      'checkParams',
      (results, cb) => {
        AdminModel.findOne({
          where: {
            username: req.body.username,
            password: req.body.password
          }
        })
          .then(function (result) {
            if (result) {
              // 组装数据。将查询结果组装到成功返回的数据中
              resObj.data = {
                id: result.id,
                username: result.username,
                name: result.name,
                role: result.role,
                lastLoginAt: dateFormat(result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
                createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
              }
              // 将admin的id保存在Token中
              const adminInfo = {
                id: result.id
              }
              //  生成token
              let token = Token.encrypt(adminInfo, TOKEN_EXPIRE_SENCOND)
              // 将token保存在返回对象中，返回前端
              resObj.data.token = token
              // 继续后续操作，传递admin的id参数
              cb(null, result.id)
            } else {
              cb(Constant.LOGIN_ERROR)
            }
          })
          .catch(function (err) {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ],
    //  写入上次登录日期
    writeLastLoginAt: [
      'query',
      (results, cb) => {
        // 获取前面传递过来的参数admin的id
        let adminId = results['query']
        //  通过id查询，将当前时间更新到数据库中的上次登录时间
        AdminModel.update(
          {
            lastLoginAt: new Date()
          },
          {
            where: {
              id: adminId
            }
          }
        )
          .then(function (result) {
            // 更新结果处理
            if (result) {
              // 更新成功，则继续后面操作
              cb(null)
            } else {
              // 更新失败，传递错误信息到async最终方法中
              cb(Constant.DEFAULT_ERROR)
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
// 上传图片方法
function upload(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.file, ['originalname'], cb)
    },
    save: [
      'checkParams',
      (results, cb) => {
        // 获取上传文件的文件名
        let lastIndex = req.file.originalname.lastIndexOf('.')
        let extension = req.file.originalname.substr(lastIndex - 1)
        //  使用时间戳作为新文件名
        let fileName = new Date().getTime() + extension
        /*
         * 保存文件
         * 3个参数
         * 1.图片的绝对路径
         * 2.写入的内容
         * 3.回调函数
         * */
        fs.writeFile(path.join(__dirname, '../public/upload/' + fileName), req.file.buffer, err => {
          //  保存出错
          if (err) {
            cb(Constant.SAVE_FILE_ERROR)
          } else {
            resObj.data = {
              // 返回文件名
              fileName: fileName,
              // 通过公共方法getImgUrl拼接图片路径
              path: Common.getImgUrl(req, fileName)
            }
            cb(null)
          }
        })
      }
    ]
  }
  Common.autoFn(tasks, res, resObj)
}
