/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:38:05
 * @LastEditTime : 2021-08-10 15:10:00
 * @Description  : 数据表cate的映射文件
 * @FilePath     : \decorate-admin-api\models\cate.js
 */
const Sequelize = require('sequelize')
const db = require('../db')
const Cate = db.define(
  'Cate',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    img: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'cate'
  }
)
module.exports = Cate
