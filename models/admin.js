/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:37:42
 * @LastEditTime : 2021-08-10 15:09:53
 * @Description  : 用来存放mysql数据表admin的映射model
 * @FilePath     : \decorate-admin-api\models\admin.js
 */
const Sequelize = require('sequelize')
const db = require('../db')
const Admin = db.define(
  'Admin',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(36),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    lastLoginAt: {
      type: Sequelize.DATE
    }
  },
  {
    underscored: true,
    tableName: 'admin'
  }
)
module.exports = Admin
