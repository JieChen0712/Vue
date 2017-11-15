var express = require('express')
var config = require('./config/index')

var port = process.env.PORT||config.build.port

var app = express()

//用express来使用路由
var apiRouter = express.Router()

apiRouter.get('/',function(req, res, next){
  req.url = '/index.html'
  next()
})

app.use(apiRouter)

//引入模拟数据
var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

//根据请求的地址获取相关的数据
apiRouter.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

apiRouter.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

apiRouter.get('/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})
//使用该接口
app.use('/api',apiRouter)

app.use(express.static('./dist'))

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

var server = app.listen(port)

module.exports = {
  close: () => {
    server.close()
  }
}