const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express();
const path = require("path");

const connection=require("../utils/connect.js")

app.use(express.json()); //  得到 post请求的提交的 formData 数据 
app.use(express.urlencoded({ extended: false })); // req.body 
app.use(express.static(path.join(__dirname, 'static')));  // 设置express静态文件目录 img/css/js

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

var session=require('express-session');
app.use(session({
  name:'my-server',
  saveUninitialized:true,
  secret:'test',
  cookie:{maxAge:1000*60*60},
  resave:false
}))

app.get("/api/demo",(req,res)=>{res.send('这是 nuxt 项目的 api 接口文件...')})

var apiRouter=require('./api');

app.use('/api',apiRouter)
