/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-08-10 10:38:14
 * @LastEditTime : 2021-08-10 15:09:56
 * @Description  : 用来存放mysql数据表article的映射model
 * @FilePath     : \decorate-admin-api\models\article.js
 */
const Sequelize = require('sequelize')
const db = require('../db')
const CateModel = require('./cate')
const Article = db.define(
  'Article',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    cate: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'article'
  }
)
module.exports = Article
// 文章所属于分类，一个分类包含多个文章，将文章表与分类表进行关联
Article.belongsTo(CateModel, { foreignKey: 'cate', constraints: false })
