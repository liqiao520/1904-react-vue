

const express = require("express");
const app = express();

const server = require("http").createServer(app);
const port = 1909;
const hostname = "0.0.0.0"; // 0.0.0.0  切换成到 公网IP 
const connection = require("./utils/connect")
const cors = require("cors");
const path = require("path");

app.use(cors()); // cors 解决跨域的问题 
app.use(express.json()); //  得到 post请求的提交的 formData 数据 
app.use(express.urlencoded({ extended: false })); // req.body 
app.use(express.static(path.join(__dirname, 'public')));  // 设置express静态文件目录 img/css/js


var session = require("express-session");
app.use(session({
  name:"my-server",
  saveUninitialized:true,
  secret:"test",
  cookie:{maxAge:1000*60*60},  // session 保存时长  1hour 
  resave:false
}))

var {checkToken} = require("./utils");



app.get("/index",(req,res)=>{
    res.send("这是我的 1909 后台服务器 地址 ...");
});

app.get("/demo",(req,res)=>{
    res.json({
        msg:"测试接口是否成功",
        code:200,
        result:"Are you Ok",
        query:req.query,
        headers:req.headers
    })
});

// app.use(checkToken);


const ReactRouter = require("./react");
app.use("/react",ReactRouter);


server.listen(port,hostname,()=>{
    console.log(`my server is listening on http://${hostname}:${port}`);
})
