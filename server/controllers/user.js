const jwt = require('jsonwebtoken');
const { query } = require('../db');
const { passwordMd5Fn ,isEmptyArray} = require('../utils/common')
//注册
exports.registerAdmin = async (ctx,next) => {
    let {username,password,phone,address,role} = ctx.request.body;
    role = role || 0;
    const passwordMd5 = passwordMd5Fn(password);
    const values = [username,passwordMd5,phone,address,role,Math.floor(new Date())]

    const tableName = role === 0 ? 'user' : 'admin_info';
    let sql = `insert into ${tableName} set username=?,password=?,phone=?,address=?,role=?,create_time=?`;
    try{
        const isHasThisUsername = await query(`select * from user where username =? and is_delete = 0`,[username]);
        if(isEmptyArray(isHasThisUsername)){
            const registerRes = await query(sql,values);
            console.log('registerRes => ',registerRes)
            ctx.body = {
                type: 1,
                message: "注册成功!"
            }
            ctx.status = 200;
        }else{
            ctx.body = {
                type: 1,
                message: "该用户已被注册",
            }
        }
    }catch(error){
        console.log('registerAdmin =>',error)
        ctx.body = {
            type: 0,
            error,
        }
    }
}
//登录
exports.loginAdmin = async (ctx,next) => {
    const {body: {username,password,type}} = ctx.request;
    console.log('type ==>>',type)
    const tableName = type === 'admin' ? 'admin_info' : 'user' ;
    let sql = `select * from ${tableName} where is_delete = 0 and username = '${username}'`;
    try{
        const passwordInDb = await query(sql);
        if(isEmptyArray(passwordInDb)){
            ctx.body = {
                type: 0,
                message: "该用户未注册!"
            }
        }else{
            if(passwordMd5Fn(password) === passwordInDb[0].password){
                const token = jwt.sign({
                    user_id: 1,
                    user_name: username,
                },'test',{ expiresIn : '6000s'})
                ctx.body = {
                    type: 0,
                    message: "登录成功",
                    token,
                    selfInfo: passwordInDb[0],
                    role: passwordInDb[0].role,
                }
            }else{
                ctx.body = {
                    type: 0,
                    message: "密码错误",
                }
            }
        }
    }catch(err){
        console.log('loginAdmin err---->>>',err)
        ctx.body = {
            type: 0,
            message: "登录失败"
        }
    }
}

exports.checkoutPassword = async (ctx,next) => {
    const {body: {username,password,type}} = ctx.request;
    const tableName = type === 'admin' ? 'admin_info' : 'user' ;
    let sql = `select * from ${tableName} where is_delete = 0 and username = '${username}'`;
    try{
        const passwordInDb = await query(sql);
            if(passwordMd5Fn(password) === passwordInDb[0].password){
                ctx.body = {
                    type: 1,
                    message: "密码正确",
                }
            }else{
                ctx.body = {
                    type: 0,
                    message: "密码错误",
                }
            }
    }catch(err){
        console.log('checkoutPassword err---->>>',err)
        ctx.body = {
            type: 0,
            message: "密码错误"
        }
    }
}

exports.getSelfInfo = async (ctx,next) => {
    const { id , type } = ctx.params; 
    const tableName = type === 'admin' ? 'admin_info' : 'user' ;
    let sql = `select * from ${tableName} where is_delete = 0 and id = '${id}'`;
    try{
        const selfInfo = await query(sql);
        ctx.body = {
            type: 1,
            selfInfo: selfInfo[0]
        }
    }catch(err){
        ctx.body = {
            type: 0,
            message: "获取个人信息失败"
        }
    }
}


exports.updateUserMes = async (ctx,next) => {
    const { id } = ctx.params; 
    const { body: { username,password,phone,address,new_password,type} } = ctx.request;
    
    const passwordMd5 = new_password ?  passwordMd5Fn(new_password) : password;
    const values = [username,passwordMd5,phone,address]
    const tableName = type === 'admin' ? 'admin_info' : 'user'
    let sql = `update ${tableName} set username=?,password=?,phone=?,address=? where id = '${id}'`
    try{
        await query(sql,values);
        ctx.body = {
            type: 1,
            message: "修改成功",
        }
    }catch(err){
        ctx.body = {
            type: 0,
            message: "修改失败",
        }
    }
    
}

exports.delUser = async (ctx,next) => {
    const {id} = ctx.params;
    let sql = `update user set is_delete = 1 where id = "${id}"`;
    await query(sql).then(res => {
        ctx.body = {
            type: 1,
            message: "删除成功",
        }
        ctx.status = 200;
    }).catch(err => {
        ctx.body = {
            type: 0,
            message: "删除失败",
        }
        ctx.status = 500;
    })
}

//获取用户列表
exports.getAllUsers = async (ctx,next) => {
    const {role} = ctx.params;
    console.log('role ==>>>', role)
    const roleSql = role === 'admin' ? 'role = 1 || role = 2' : `role = ${role}` ;
    const tableName = role === 'admin' ? 'admin_info' : 'user' ;
    const sql = `select * from ${tableName} where (${roleSql}) and is_delete = 0 order by create_time desc`
    try{
        const adminList =  await query(sql);
        const amount = await query(`select count(*) from user where (${roleSql}) and is_delete = 0 `);
        ctx.body = {
            admins : adminList,
            amount: amount[0]['count(*)'],
            type: 1
        }
    }catch(error){
        ctx.body = {
            error,
            type: 0
        }
    }
}

