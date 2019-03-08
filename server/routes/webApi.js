const router = require('koa-router')()
const Pet = require('../controllers/pet')
const Upload = require('../controllers/upload')
router.prefix('/api_web')
//获取所有的宠物分类
router.get('/allPetCategory',(ctx,next) => Pet.getAllPetCategory(ctx,next))

router.get('/petList/:type/:breed_id',(ctx,next) => Pet.getPetList(ctx,next))

router.get('/searchPet/:name',(ctx,next) => Pet.searchPetByName(ctx,next))
//获取轮播图列表
router.get('/sliderImgList',(ctx,next) => Upload.getSliderImg(ctx,next))

module.exports = router
