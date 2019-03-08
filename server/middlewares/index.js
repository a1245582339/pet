const jwt = require('jsonwebtoken');

const jwtVerify = async (ctx,next) => {
    if(['/api/login','/api/register','/api/upload'].indexOf(ctx.url) > -1){
		console.log('test ==>>>')
		await next()
	}else if(/\/api_web/g.test(ctx.url)){
		await next()
	}else if(/images/g.test(ctx.url)){
		await next()
	}else{
		const token = ctx.get('Authorization');
		// console.log('Authorization ==>>>',token)
		if(token){
			try{
				const tokenContent = await jwt.verify(token,'test');
				// console.log('tokenContent => ',tokenContent)
				await next()
			}catch(error){
				console.log("error => ", error.message)
				if(error.message === 'jwt expired'){
					ctx.body = {
						type: 'jwt expired',
						message: "身份认证过期请重新登录!"
					}
					ctx.status = 200;
				}
				
			}
		}else{
			ctx.body = {
				type: 0,
				message: "请重新登录"
			}
			ctx.status = 401;
		}
	};
	
}

module.exports = {
    jwtVerify
}