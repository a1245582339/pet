const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const index = require('./routes/index')
const admin = require('./routes/admin')
const webApi = require('./routes/webApi')
const { jwtVerify } = require('./middlewares')
const cors = require('koa2-cors')
// error handler
onerror(app)
app.use(cors({
	origin: function(ctx){
		return 'http://localhost:3001';
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE','PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// middlewares
app.use(koaBody({
    multipart: true,
    formidable: {
		maxFieldsSize: 3000*1024*1024,
    }
}))

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 验证身份
app.use((...args) => jwtVerify(...args))
// routes
app.use(index.routes(), index.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(webApi.routes(), webApi.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
