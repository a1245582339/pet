const router = require('koa-router')()
const User = require('../controllers/user')
const Pet = require('../controllers/pet')
const Order = require('../controllers/order')
const Upload = require('../controllers/upload')
router.prefix('/api')
// 超级管理员只有一个 admin admin@123   /api/sliderImg
//图片上传
router.post('/upload',(ctx,next) => Upload.uploadImg(ctx,next))

//添加轮播图
router.post('/sliderImg',(ctx,next) => Upload.addSliderImg(ctx,next))
//获取轮播图列表
router.get('/sliderImgList',(ctx,next) => Upload.getSliderImg(ctx,next))
//删除轮播图
router.delete('/sliderImg/:id',(ctx,next) => Upload.delSliderImg(ctx,next))

//用户注册
router.post('/register',(ctx,next) => User.registerAdmin(ctx,next))
//用户登录
router.post('/login',(ctx,next) => User.loginAdmin(ctx,next))
// 校验密码
router.post('/checkoutPassword',(ctx,next) => User.checkoutPassword(ctx,next))
//获取个人信息
router.get('/getSelfInfo/:id/:type',(ctx,next) => User.getSelfInfo(ctx,next))
//管理员修改自己的信息
router.put('/putUser/:id',(ctx,next) => User.updateUserMes(ctx,next))

//获取全部管理员
router.get('/allAdmin/:role',(ctx,next) => User.getAllUsers(ctx,next))
//添加管理员 需要超级权限
router.post('/addUser',(ctx,next) => User.registerAdmin(ctx,next))
//删除管理员 需要超级权限
router.delete('/delUser/:id',(ctx,next) => User.delUser(ctx,next))

//获取全部普通用户
router.get('/allUser',(ctx,next) => User.getAllUsers(ctx,next))
//删除普通用户
router.delete('/delUser/:id',(ctx,next) => User.delUser(ctx,next))

//获取所有的宠物分类
router.get('/allPetCategory',(ctx,next) => Pet.getAllPetCategory(ctx,next))
//添加宠物分类
router.post('/addPetCate',(ctx,next) => Pet.addPetCate(ctx,next))
//删除宠物分类
router.delete('/delPetCate/:id',(ctx,next) => Pet.delPetCate(ctx,next))
//删除宠物种类
router.delete('/delPetBreed/:id',(ctx,next) => Pet.delPetBreed(ctx,next))
//修改宠物分类
router.put('/updatePetCate',(ctx,next) => Pet.updatePetCate(ctx,next))

router.post('/addBreed',(ctx,next) => Pet.addPetBreed(ctx,next))

//获取宠物列表
router.get('/petList/:type',(ctx,next) => Pet.getPetList(ctx,next))

//添加宠物
router.post('/addPet',(ctx,next) => Pet.addPet(ctx,next))
//获取宠物详情
router.get('/getPetDetail/:id',(ctx,next) => Pet.getPetDetailById(ctx,next))
//删除宠物
router.delete('/delPet/:id',(ctx,next) => Pet.delPetDetailById(ctx,next))
//修改宠物信息
router.put('/editPet',(ctx,next) => Pet.updatePetDetailById(ctx,next))

//发起申请
router.post('/applyForPet',(ctx,next) => Order.applyForPet(ctx,next))
//获取所有的订单列表
router.get('/petOrderList/:type'/**{null: 所有的,0: 未处理, 1: 已处理}*/,(ctx,next) => Order.getAllApplyForList(ctx,next))
//获取个人订单
router.get('/getOrderByUserId/:id'/**{null: 所有的,0: 未处理, 1: 已处理}*/,(ctx,next) => Order.getOrderByUserId(ctx,next))
//删除申请
router.delete('/delOrder/:id',(ctx,next) => Order.delApplyForById(ctx,next))
//修改申请
router.put('/updateOrder'/** { yes 1: 同意, no 2: 拒绝}*/,(ctx,next) => Order.updateApplyForById(ctx,next))






module.exports = router
