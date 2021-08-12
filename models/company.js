/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:38:20
 * @LastEditTime : 2021-08-10 15:10:02
 * @Description  : 用来存放mysql数据表COMPANY的映射model
 * @FilePath     : \decorate-admin-api\models\company.js
 */
const Sequelize = require('sequelize')
const db = require('../db')

const Company = db.define(
  'Company',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tel: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    intro: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    longitude: {
      type: Sequelize.DECIMAL(6),
      allowNull: false
    },
    latitude: {
      type: Sequelize.DECIMAL(6),
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'company'
  }
)

module.exports = Company
