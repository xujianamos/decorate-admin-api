/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:37:49
 * @LastEditTime : 2021-08-10 15:10:04
 * @Description  : 数据表event的映射
 * @FilePath     : \decorate-admin-api\models\event.js
 */
const Sequelize = require('sequelize')
const ArticleModel = require('./models/article')
const db = require('../db')
// 定义model
const Event = db.define(
  'Event',
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
    },
    url: {
      type: Sequelize.STRING
    },
    articleId: {
      type: Sequelize.INTEGER
    }
  },
  {
    underscored: true,
    tableName: 'event'
  }
)
module.exports = Event
// 将活动表和文章表进行关联
Event.belongsTo = (ArticleModel, { foreignKey: 'articleId', targetKey: 'id', constraints: false })
