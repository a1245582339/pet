
const fs = require('fs')
const path = require('path')
const { query } = require('../db')
exports.uploadImg = async (ctx,next) => {
    try{
        const file = ctx.request.files.pet_image;
        const reader = fs.createReadStream(file.path);
        const fileName = file.name.split('.')[0] + Date.parse(new Date()) + "." + file.name.split('.')[1];
        let filePath = path.join(__dirname,'../public/images/') + `${fileName}`;
        const upStream = fs.createWriteStream(filePath);
        await reader.pipe(upStream);
        ctx.body = {
            type: 1,
            images_path: `/images/${fileName}`
        }
    }catch(err){
        ctx.body = {
            type: 1,
            message: err
        }
    }
}

const getBreedList = (selectedRows) => {
    return Promise.all(selectedRows.map( async (item) => {
        const selectBreedSql = `insert into slider_img set image='${item.image}',pet_id='${item.id}',create_time='${Date.parse(new Date())}'`
        try{
            const res = await query(selectBreedSql);
            return res;
        }catch(error){
            console.log('error ==>>',error)
        }
        
    })
)
}
exports.addSliderImg = async (ctx,next) => {
    const {selectedRows} = ctx.request.body;
    console.log('selectedRows ==>>',selectedRows)
    try{
        await getBreedList(selectedRows);
        ctx.body = {
            type: 1,
            message: "添加成功"
        }
    }catch(error){
        ctx.body = {
            error: error,
            message: "添加失败"
        }
    }
}
exports.getSliderImg = async (ctx,next) => {
    const sql = `select * from slider_img order by create_time desc`
    try{
        let allSliderImg = await query(sql);
        allSliderImg = Array.from(allSliderImg);
        return Promise.all(allSliderImg.map(async item => {
            return await query(`select * from pet where id = ${item.pet_id}`)
        })).then(res => {
            const petIds = res.filter(item => {
                return item.length > 0 && item[0].is_delete == 0;
            }).map(item => Number(item[0].id))
            allSliderImg = allSliderImg.filter(i => petIds.includes(Number(i.pet_id)))
            ctx.body = {
                type: 1,
                allSliderImg
            }
        }).catch(err => {
            console.log('err ===>>>',err)
        })
      
    }catch(error){
        ctx.body = {
            error: error,
            message: "轮播图获取失败",
            type: 0
        }
    }
}
exports.delSliderImg = async (ctx,next) => {
    const sliderId = ctx.params.id;
    try{
        await query(`delete from slider_img where id = ${sliderId}`)
        ctx.body = {
            type: 1,
            message: "删除成功"
        }
    }catch(error){
        console.log('del sliderImg err ==>>',error)
        ctx.body = {
            type : 0,
            message : '删除失败'
        }
    }
}