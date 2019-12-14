const express=require("express");

const app=express();

const server=require('http').createServer(app);
const port=1909;
const hostname="0.0.0.0";
const connection=require("./utils/connect");
const cors=require("cors")
const path = require("path");


app.use(cors()); 
app.use(express.json()); //  得到 post请求的提交的 formData 数据 
app.use(express.urlencoded({ extended: false })); // req.body 
app.use(express.static(path.join(__dirname, 'static')));  // 设置express静态文件目录 img/css/js



var session=require('express-session');
app.use(session({
  name:'my-server',
  saveUninitialized:true,
  secret:'test',
  cookie:{maxAge:1000*60*60},
  resave:false
}))


app.get("/api/demo",(req,res)=>{res.send('这是 nuxt 项目的 api 接口文件...')})

var apiRouter=require('./server/api');

app.use('/api',apiRouter)

server.listen(port,hostname,()=>{
  console.log(`my server is listening on http://${hostname}:${port}`)
})