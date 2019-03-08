import React from 'react'
import { register } from '../http'
import { Form, Icon, Input, Button, message} from 'antd';
import { Link } from 'react-router-dom'
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
	state = {
		confirmDirty: false
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				register(values).then(({ data }) => {
					message.success(data.message)
					if(data.type === 1){
						this.props.history.replace('/login')
					}
				}).catch(error => {
					message.success(error)
				})
			}
		});
	}
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	validatePhoneNumber = (rule, value, callback) => {
		// const form = this.props.form;
		if(value && !(/^1[34578]\d{9}$/.test(value))){
			callback('请输入正确的手机号!');
		}else{
			callback();
		}
	}

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('请再次确认密码');
		} else {
			callback();
		}
	}

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="wrap">
				<Form onSubmit={this.handleSubmit} className="login-form">
				<div className="login-title">注册用户</div>
				<FormItem>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: '请输入用户名!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('phone', {
						rules: [{ required: true, message: '请输入手机号!' },{validator: this.validatePhoneNumber}],
					})(
						<Input prefix={<Icon type="mobile" 
						style={{ color: 'rgba(0,0,0,.25)' }} onBlur={this.validatePhoneNumber} />} placeholder="手机号" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('address', {
						rules: [{ required: true, message: '请输入住址!' }],
					})(
						<Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="住址" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: '请输入密码!' },{
							validator: this.validateToNextPassword,
						}],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('confirm', {
						rules: [{ required: true, message: '请再次输入密码!' },{
							validator: this.compareToFirstPassword,
						}],
					})(
						<Input 	prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" 
								placeholder="请再次输入密码" onBlur={this.handleConfirmBlur} />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button">
						注册
					</Button>
					<Link to="/login" className="login-btn">直接登录</Link>
				</FormItem>
			</Form>
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
