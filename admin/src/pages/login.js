import React from 'react'
import { login } from '../http'
import { Form, Icon, Input, Button , message} from 'antd';

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
		if (!err) {
			login({...values,type: 'admin'}).then(({ data }) => {
				if(data.token){
					message.success(data.message)
					localStorage.setItem('token',data.token);
					localStorage.setItem('selfInfo',JSON.stringify(data.selfInfo));
					this.props.history.replace('/home')
				}else{
					message.error(data.message)
				}
			}).catch(error => {
				console.log('login error =>',error)
			})
		}
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
		<div className="wrap">
			<Form onSubmit={this.handleSubmit} className="login-form">
			<div className="login-title">欢迎登录</div>
			<FormItem>
				{getFieldDecorator('username', {
					rules: [{ required: true, message: '请输入用户名!' }],
				})(
					<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
				)}
			</FormItem>
			<FormItem>
				{getFieldDecorator('password', {
					rules: [{ required: true, message: '请输入密码!' }],
				})(
					<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
				)}
			</FormItem>
			<FormItem>
				<Button type="primary" htmlType="submit" className="login-form-button">
					登录
				</Button>
			</FormItem>
		</Form>
		</div>
	);
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
