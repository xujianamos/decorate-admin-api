var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
// 引入中间件
const verifyMiddleware = require('./routes/middleware/verify')
// 导入路由
var indexRouter = require('./routes/index')
var orderRouter = require('./routes/order')
var eventRouter = require('./routes/event')
var cateRouter = require('./routes/cate')
var caseRouter = require('./routes/case')
var articleRouter = require('./routes/article')
var companyRouter = require('./routes/company')
var adminRouter = require('./routes/admin')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 使用路由
app.use('/', indexRouter)
app.use('/order', verifyMiddleware.verifyToken, orderRouter)
app.use('/event', verifyMiddleware.verifyToken, eventRouter)
app.use('/cate', verifyMiddleware.verifyToken, cateRouter)
app.use('/case', verifyMiddleware.verifyToken, caseRouter)
app.use('/article', verifyMiddleware.verifyToken, articleRouter)
app.use('/company', verifyMiddleware.verifyToken, companyRouter)
app.use('/admin', verifyMiddleware.verifyToken, adminRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
