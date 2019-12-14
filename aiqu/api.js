var express = require("express");
var router = express.Router();

const { aesEncrypt, keys } = require("../utils");
var { Movie, User, Mud, Chen, List, Find, Xiang,Dan } = require("../utils/schema")

router.get('/index', (req, res) => {
    res.json({
        cde: 200,
        msg: "index 数据请求成功"
    })
})

router.get("/movie", (req, res) => {
    var limit = req.query.limit * 1 || 0;

    Movie.find({}, {}).sort({ _id: -1 }).limit(limit).then(result => {
        res.json({
            result,
            code: 200,
            msg: '电影数据获取成功'
        })
    })
})

router.post("/register", (req, res) => {
    var body = req.body;
    console.log(body)
    User.findOne({
        mobile: body.mobile * 1,
    }).then(result => {
        if (result) {
            res.json({
                msg: "账号或者手机号已经被注册,请重新注册",
                code: 200,
                result: "注册失败"
            })
        } else {
            // 插入新数据
            User.insertMany(
                body
            ).then(result => {
                res.json({
                    msg: "注册成功",
                    code: 200,
                    result
                })
            })
        }
    })


})

// 登录
// 登录

router.post("/login", (req, res) => {
    var body = req.body;
    var mobile = body.mobile * 1
    // console.log(mobile)
    User.findOne({
        mobile

    }).then(result => {
        //    console.log(result)
        if (result) {
            if (result.password == body.password) {

                req.session.mobile = result.mobile;
                req.session.username = result.username;
                req.session.flag = result.flag;
                req.session.token = aesEncrypt(body.mobile + new Date().getTime(), keys)
                req.session.sno = result.sno;


                res.json({
                    msg: "验证通过,登录成功",
                    code: 200,
                    flag: 1,
                    result,
                    token: req.session.token
                })
            } else {
                res.json({
                    msg: "账户和密码不一致,请重新登录",
                    code: 200,
                    flag: 0
                })
            }
        } else {
            res.json({
                msg: "账户不存在,请重新登录",
                code: 200,
                flag: 0
            })
        }




    })


})


// 上上传头像  
var multer = require("multer");
var storage = multer.diskStorage({   // 操作硬盘 
    destination: function (req, file, cb) {
        cb(null, './static/avatar')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + 'wh1909' + file.originalname); // 123412123231221wh19092.jpg
    }
});

// 创建上传对象   
var upload = multer({ storage: storage }).any();

router.post("/uploadpic", upload, (req, res) => {

    var path = req.files[0].path;
    

    User.updateOne({
        mobile: req.session.mobile
    }, {
        $set: {
            pic: path
        }
    }).then(result => {
        res.json({
            msg: "头像上传成功...",
            pic: path,
            result,
        })
    })

})

// // 获取头像
router.post("/getavatar", (req, res) => {
    var body = req.body;


    User.findOne({
        mobile: req.session.mobile
    }).then(result => {
        if (result.pic) {
            res.json({
                code: 200,
                msg: "获取头像成功",
                result,
                flag: 1
            })
        } else {
            res.json({
                code: 200,
                msg: "获取头像失败",
                flag: 0
            })
        }
    })

})

// 获取目的地
router.get("/getmu", (req, res) => {
    // var limit=req.query.limit*1||0;
    var countryId = req.query.id;
    console.log(countryId)

    Mud.find({ countryId }).then(result => {
        res.json({
            result,
            code: 200,
            msg: '获取列表成功'
        })
    })
})

router.get("/getli", (req, res) => {
    // var limit=req.query.limit*1||0;

    Chen.find({}, {}).then(result => {
        res.json({
            result,
            code: 200,
            msg: '获取列表成功'
        })
    })
})

//获取首页列表
router.get("/getlist", (req, res) => {


    List.find({}, {}).then(result => {
        res.json({
            result,
            code: 200,
            msg: '获取列表成功'
        })
    })
})

//获取发现列表
router.get("/getfind", (req, res) => {
    // var limit=req.query.limit*1||0;

    Find.find({}, {}).then(result => {
        res.json({
            result,
            code: 200,
            msg: '获取列表成功'
        })
    })
})

// 获取 目的地的搜索
router.get("/soumu", (req, res) => {
    var keyword = req.query.value;

    var obj = {};


    if (keyword) {
        obj = {
            $or: [
                { 'text': new RegExp(keyword) },
                { 'children': new RegExp(keyword) },
            ]
        }
    } else {
        res.json({
            code: 200,
            msg: '请输入正确的目的地'
        })
    }
    Chen.find(obj).then(result => {
        res.json({
            code: 200,
            msg: "获取搜索目的地成功",
            result
        })
    })
})

// 获取详情
router.get("/getdetail", (req, res) => {
    // var limit=req.query.limit*1||0;
    var productId = req.query.id;


    Xiang.find({ productId }).then(result => {
        res.json({
            result,
            code: 200,
            msg: '获取详情成功'
        })
    })
})

// 添加地址
router.post("/goaddress", (req, res) => {
    var body = req.body

    var mobile = req.session.mobile
     User.findOne({
        mobile
    }).then(result => {

        if (result) {
             result.address.push(
                body
            )

            User.updateMany({
                mobile
            }, {
                $set: {
                    address: result.address
                }
            }).then(result => {
                User.updateOne({
                    mobile,
                    address:result.address
                },{
                    $inc:{
                        id:1
                    }
                }).then(obj=>{
                    res.json({
                        code: 200,
                        msg: '添加地址成功',
                        result
                    })
                })
               

            })
        } else {
            User.insertMany({
                address
            }).then(last => {

            })
        }

    })

})

router.get("/getaddress", (req, res) => {
    var mobile = req.session.mobile
 

    User.find({ mobile }).then(result => {
   
        if (result.address!=[]) {
           
            res.json({
                result,
                code: 200,
                msg: '获取地址成功'
            })

        } else {
            res.json({

                code: 200,
                msg: '请添加地址'
            })
        }

    })
})

// 提交订单

router.post("/dan", (req, res) => {
    var mobile = req.session.mobile
    console.log(mobile)
    var body=req.body;
    console.log(body)
    Dan.find({ mobile }).then(result => {
        console.log(result,333)
        if (result!="") {
            result.detaill.push({
                body
            }
           )

           Dan.updateMany({
               mobile
           }, {
               $set: {
                detaill: result.detaill
               }
           }).then(result => {
             
                   res.json({
                       code: 200,
                       msg: '添加订单成功',
                       result
                   })
             
              console.log(result)

           })
        }else{
            console.log(body,444)
            Dan.insertMany(
                body
            ).then(last => {

            })
        }
    })
})

// 获取订单
router.get("/getorder", (req, res) => {
    var mobile = req.session.mobile
    console.log(mobile)

    Dan.find({ mobile }).then(result => {
        console.log(result)
        if (result) {
           
            res.json({
                result,
                code: 200,
                msg: '获取订单成功'
            })

        } else {
            res.json({

                code: 200,
                msg: '请添加订单'
            })
        }

    })
})


module.exports = router;