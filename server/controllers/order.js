
const { query } = require('../db')


exports.applyForPet = async ctx => {
    const {user_id,pet_id} = ctx.request.body;
    const values = [user_id,pet_id,Date.parse(new Date())];
    const sql = 'INSERT INTO order_list SET user_id=?,pet_id=?,create_time=?';
    try{
        const hasInOrder = await query(`select * from order_list where user_id = ${user_id}`)

        console.log('!important!important!important==>>',hasInOrder)
        if(hasInOrder.length > 0){
            const pet_status =   hasInOrder.find(item => item.pet_id === pet_id) 
            console.log('pet_status ==>>',pet_status)
            if(pet_status){
                const { status } = pet_status;
                // 0 申请 1 允许 2 拒绝
                const statusMes = {
                    0 : '已经发出申请,不能重复请求',
                    1 : '正在领养中,不能重复请求',
                    2 : '已经被拒绝,不能重复请求'
                }
                ctx.body = {
                    type: 1,
                    message: statusMes[status]
                }
            }else{
                console.log('pet_status kong==>>')
                await query(`update pet set status = 1 where id = ${pet_id}`)
                await query(sql,values)
                ctx.body = {
                    type: 1,
                    message: "认领已发出"
                }
            }
        }else{
            console.log('pet_status no==>>')
            const hasInOrder = await query(`select * from order_list where user_id = ${pet_id}`)
            if(hasInOrder && hasInOrder.length > 0){
                ctx.body = {
                    type: 1,
                    message: "该宠物已经在认领中"
                }
            }else{
                await query(`update pet set status = 1 where id = ${pet_id}`)
                await query(sql,values)
                ctx.body = {
                    type: 1,
                    message: "认领已发出"
                }
            }   
            
        }
        
    }catch(err){
        ctx.body = {
            type: 0,
            message: "认领出现错误"
        }
    }
}

exports.getAllApplyForList = async ctx => {
    const sql = 'select order_list.* , user.username, user.phone , user.address, pet.id as pet_id, pet.name as pet_name ,pet.image as pet_image  from order_list join user on order_list.user_id = user.id join pet on order_list.pet_id = pet.id where order_list.is_delete = 0;';
    await query(sql).then(res => {
        ctx.body = {
            applyForList: res,
            type: 0
        }
    }).catch(err => {
        ctx.body = {
            err
        }
    })
}
//获取个人订单
exports.getOrderByUserId = async ctx => {
    const { id } = ctx.params;
    const sql = `select order_list.id as order_id, order_list.status as order_status, user.username , pet.*,pet_cate.name as category_name  from order_list join user on order_list.user_id = user.id join pet on order_list.pet_id = pet.id join pet_cate on pet_cate.id = pet.category_id  where order_list.is_delete = 0 and order_list.user_id = ${id};`
    try{
        const res = await query(sql);

        console.log('getOrderByUserId  =>>>',res)
        ctx.body = {
            petList: res,
            type: 0
        }
    }catch(err){
        ctx.body = {
            message: "获取信息失败",
            type: 0
        }
    }
}

exports.delApplyForById = async ctx => {
    const { id } = ctx.params;
    const sql = `update order_list set is_delete = 1 where id = ${id}`;
    try{
        await query(sql);
        ctx.body = {
            type: 1,
            message: "删除成功!"
        }
    }catch(err){
        ctx.body = {
            type: 1,
            message: "删除失败!"
        }
    }
    
}
exports.updateApplyForById = async ctx => {
    const { id,pet_id,status } = ctx.request.body;
    const sql = `update order_list set status = ${status} where id = ${id}`;
    try{
        await query(sql)
        await query(`update pet set status = ${status+1} where id = ${pet_id}` )
        ctx.body = {
            type: 1,
            message: '修改成功'
        }
    }catch(err){
        ctx.body = {
            type: 0,
            message: '修改失败'
        }
    }
}