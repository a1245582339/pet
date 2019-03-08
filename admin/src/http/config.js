import axios from 'axios'
import { message } from 'antd';
// 创建axios实例
const ajax = axios.create({
    timeout: 5000
})

// request拦截器
ajax.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token')
		config.headers['Authorization'] = token;
		return config
	},
  	error => {}
)

// respone拦截器
ajax.interceptors.response.use(
  	response => {
		if(response.data.type === 'jwt expired'){
			message.error(response.data.message)
			setTimeout(() => {
				window.location.href = window.location.origin + '/login'
			},1000)
			return;
		}
		return response
    },
	error => {
		console.log('=======>>>',error)
		return Promise.reject(error)
	}
)


export default ajax ;

