/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:37:54
 * @LastEditTime : 2021-08-10 15:10:07
 * @Description  : 用来存放mysql数据表order的映射model
 * @FilePath     : \decorate-admin-api\models\order.js
 */
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define(
  'Order',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    type: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    orderDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'order'
  }
)
module.exports = Order
