const { query } = require('../db')
exports.addPet = async (ctx,next) => {
    const {name,age,image,area,category_id,pet_desc,breed} = ctx.request.body;
    const values = [name,image,age,area,category_id,pet_desc,breed,Date.parse(new Date())];
    const sql = 'insert into pet set name=?,image=?,age=?,area=?,category_id=?,pet_desc=?,pet_breed=?,create_time=?'
    await query(sql,values).then(res => {

        console.log('addPet ==>>>',res)
        const { insertId } = res;
        ctx.body = {
            type: 1,
            message: "添加成功",
            insertId
        }
    }).catch(err => {
        ctx.body = {
            error: err
        }
    })
}

exports.getAllPetCategory = async (ctx,next) => {
    const sql = 'select * from pet_cate order by create_time asc';
    try{
        const res = await query(sql)
        const allPetCategory = await getBreedList(res)
        ctx.body= {
            allPetCategory,
            type: 1
        }
    }catch(error){
        console.log('getAllPetCategory err',error)
        ctx.body= {
            message: "获取分类失败",
            type: 0
        }
    }
}
const getBreedList = (allPetCategory) => {
    return Promise.all(allPetCategory.map( async (item) => {
        const selectBreedSql = `select * from pet_breed where cate_id = ${item.id} order by create_time desc`
        const breedArr = await query(selectBreedSql) ;
        return {...item,pet_breed:breedArr}
    })
)
}

exports.addPetCate = async (ctx,next) => {
    const {name} = ctx.request.body;
    const values = [name, Date.parse(new Date())];
    const sql = `INSERT INTO pet_cate SET name=?,create_time=?`;
    const unitySql = `select id from pet_cate where name = '${name}'`
    try{
        const unitySqlRes = await query(unitySql);
        if(unitySqlRes.length === 0){
            await query(sql,values).then(res => {
                ctx.body= {
                    message: '添加分类成功',
                    id: res.insertId,
                    type: 1
                }
            }).catch(err => {
                console.log('addPetCate err--->>>',err)
                ctx.body= {
                    message: '添加分类失败',
                    type: 0
                }
            })
        }else{
            ctx.body= {
                message: '该分类已存在',
                type: 2
            }
        }
    }catch(error){
        console.log('addPetCate err--->>>',error)
    }


    

}
exports.addPetBreed = async (ctx,next) => {
    const {name,cate_id} = ctx.request.body;
    const values = [name,cate_id,Date.parse(new Date())];
    const sql = `INSERT INTO  pet_breed SET name=?,cate_id=?,create_time=?`;
    const unitySql = `select id from pet_breed where name = '${name}'`
    try{
        const unitySqlRes = await query(unitySql)
        if(unitySqlRes.length === 0){
            await query(sql,values).then(res => {
                ctx.body= {
                    message: '添加品种成功',
                    id: res.insertId,
                    type: 1
                }
            }).catch(err => {
                console.log('addPetBreed err--->>>',err)
                ctx.body= {
                    message: '添加品种失败',
                    type: 0 
                }
            })
        }else{
            ctx.body= {
                message: '该品种已存在',
                type: 2
            }
        }
    }catch(error){
        console.log('addPetBreed ==>>',error)
    }   
}
exports.delPetBreed = async (ctx,next) => {
    const { id } = ctx.params;
    const sql = `delete from pet_breed where id = ${id}`;
    await query(sql).then(res => {
        console.log('addDelBreed --->>>',res)
        ctx.body= {
            message: '删除品种成功',
            type: 1
        }
    }).catch(err => {
        console.log('addPetBreed err--->>>',err)
        ctx.body= {
            message: '删除品种失败',
            type: 0 
        }
    })

}
exports.delPetCate = async (ctx,next) => {
    const { id } = ctx.params;
    const sql = `delete from pet_cate where id = ${id}`;
    await query(sql).then(res => {
        console.log('delPetCate --->>>',res)
        ctx.body= {
            message: '删除分类成功',
            type: 1
        }
    }).catch(err => {
        console.log('addPetCate err--->>>',err)
        ctx.body= {
            message: '删除分类失败',
            type: 0
        }
    })

}
exports.updatePetCate = async (ctx,next) => {
    const { id, name } = ctx.request.body;
    const sql = `update pet_cate set name = '${name}' where id = ${id}`;
    await query(sql).then(res => {
        console.log('updatePetCate --->>>',res)
        ctx.body= {
            message: '修改分类成功',
            type: 1
        }
    }).catch(err => {
        console.log('updatePetCate err--->>>',err)
        ctx.body= {
            message: '修改分类失败',
            type: 0
        }
    })

}

exports.getPetList = async (ctx,next) => {
    const { type, breed_id } = ctx.params;
    const baseSql = `select pet.*, pet_cate.name as category_name from pet join pet_cate on pet.category_id = pet_cate.id`
    let sql ;
    if(type === 'all'){
        sql = baseSql;
    }else if(!breed_id){
        sql = `${baseSql} and category_id = ${type}`;
    }else{
        sql = `${baseSql} and category_id = ${type} and pet_breed = ${breed_id}` ;
    }
    await query(`${sql} where pet.status in (0,1)`).then(res => {
        ctx.body = {
            type: 1,
            petList: res
        }
    }).catch(err => {
        ctx.body = {
            type: 0,
            message: err
        }
    })
}

exports.getPetDetailById = async (ctx) => {
    const { id } = ctx.params;
    const sql = `select * from pet where id = ${id}`;
    await query(sql).then(res => {
        ctx.body = {
            res
        }
    }).catch(err => {
        ctx.body = {
            err
        }
    })
}
exports.delPetDetailById = async (ctx) => {
    const { id } = ctx.params;
    const sql = `delete from pet where id = ${id}`;
    try{
        const delRes = await query(sql);
        console.log('delRes =>>>',delRes)
        ctx.body = {
            type: 1,
            message: "删除成功!"
        }
    }catch(error){
        console.log('delRes error=>>>',error)
        ctx.body = {
            type: 0,
            message: "删除失败!"
        }
    }
}

exports.updatePetDetailById = async ctx => {
    const {id,name,age,area,category_id,pet_desc,breed} = ctx.request.body;
    const petValues = [name,age,area,category_id,pet_desc,breed,Date.parse(new Date())];
    const sql = `update pet set name=?,age=?,area=?,category_id=?,pet_desc=?,pet_breed=?,create_time=? where id = ${id}`;
    
    try{
        await query(sql,petValues)
        ctx.body = {
            type: 1,
            message: "修改成功"
        }
    }catch(err){
        console.log('err ==>>>',err)
        ctx.body = {
            type: 0,
            message: "修改失败"
        }
    }
}


exports.searchPetByName = async ctx => {
    const {name} = ctx.params;
    const sql = `select pet.*, pet_cate.name as category_name from pet join pet_cate on pet.category_id = pet_cate.id where pet.name like '%${name}%'` ;
    try{
        const searchRes = await query(sql)
        ctx.body = {
            type: 1,
            petList: searchRes
        }
    }catch(err){
        ctx.body = {
            type: 0,
            message: err
        }
    }
}