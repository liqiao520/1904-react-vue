var mongoose=require("mongoose");

var Schema=mongoose.Schema;

// var student_schema=new Schema({
//     mobile:Number,
//     username:String,
//     password:String,
//     dbpwd:String,
//     sno:Number,//学生编号
//     bno:Number, //学生班级编号
//     flag:Boolean,
//     banji:String,
//     email:String,
//     md:String,
//     btext:String,
//     score:Number,
//     badList:Array,
//     pic:String  //头像

// })

// exports.Student=mongoose.model("student",student_schema);

// var uid_schema=new Schema({
//     name:String,
//     id:Number
// })

// exports.Uid=mongoose.model("uid",uid_schema);

// var teacher_schema=new Schema({
//     mobile:Number,
//     username:String,
//     password:String,
//     dbpwd:String,
//     sno:Number,//学生编号
//     bno:Number, //学生班级编号
//     flag:Boolean,
//     pic:String
// })

// exports.Teacher=mongoose.model("teacher",teacher_schema);

// var banji_schema=new Schema({
//     banji_text:String,
//     banji_code:String
// })

// exports.Banji=mongoose.model("banji",banji_schema);

// // 当前教师的班级列表
// var tlist_schema=new Schema({
//     id:Number,
//     tno:Number,
//     tname:String,
//     bcode:String,
//     btext:String,
//     tbanji:Array
// })

// exports.Tlist=mongoose.model("tlist",tlist_schema)

// var stuinfo_schema=new Schema({
//     stuno:Number,
//     stuname:String,
//     stumobile:Number,
//     stubanjicode:String,
//     stubanjitext:String,
//     stuscore:Number
// })

// exports.Stuinfo=mongoose.model("stuinfo",stuinfo_schema)

// var weiji_schema=new Schema({
//     id:Number,
//     sno:Number,
//     sname:String,
//     tno:Number,
//     tname:String,
//     reason:Object,
//     time:Date,
//     md:String,
//     shen:Object,
//     shentext:String,
//     step:Number,
// })

// exports.Weiji=mongoose.model("weiji",weiji_schema)

// var reason_schema=new Schema({
//     reason:String,
//     count:Number,
//     type:String,

// })
// exports.Reason=mongoose.model("reason",reason_schema)

var movie_schema=new Schema({
    rating:Object,
    genres:Array,
    title:String,
    year:String,
    images:Object,
    id:String
})
exports.Movie=mongoose.model("movie",movie_schema)

var user_schema=new Schema({
    mobile:Number,
    username:String,
    password:String,
    id:Number,
    pic:String,
    flag:Boolean,
    address:Array
})

exports.User=mongoose.model("user",user_schema);

var mud_schema=new Schema({
    countryId : Number,
    cityId : Number,
    nameZh : String,
    nameEn : String,
    nameSpelling : String,
    headImg: String,
    navs :Array
})

exports.Mud=mongoose.model("mud",mud_schema);

var chen_schema=new Schema({
    stateId : Number,
    type : Boolean,
    code: String,
    openUrl : String,
    name: String,
    zoneId: Number,
    areaInfos:Array
})

exports.Chen=mongoose.model("chen",chen_schema);

var list_schema=new Schema({
    productId : Number,
    symbol : String,
    lowestPrice : String,
    name: String,
    buyerCount : Number,
    thumbnail:String,
    promotionIcon:String
   
})

exports.List=mongoose.model("list",list_schema);

var find_schema=new Schema({
    title:String,
    result:Array
   
})

exports.Find=mongoose.model("find",find_schema);

var xiang_schema=new Schema({
    productId : Number,
    nameZh : String,
    nameEn : String,
    status : Number,
    purchaseNum : Number,
    price : Number,
    priceSymbol : String,
    canAddCart: Number,
    isOnline : Number,
    iack : Number,
    imageVedioList:Array,
    discountView:Array,
    playIntroduce:Array
   
})

exports.Xiang=mongoose.model("xiang",xiang_schema);


var dan_schema=new Schema({
   
    mobile:Number,
    username:String,
    detaill:Object
   
})

exports.Dan=mongoose.model("dan",dan_schema);