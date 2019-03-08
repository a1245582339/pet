import React from 'react'
import { getSelfInfo, updateSelfInfo , checkoutPassword} from '../../http'
import { Form, Icon, Input, Button, message} from 'antd';
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
	state = {
		confirmDirty: false,
		selfInfo: {},
		changePassword: false
	}
	handleInitSelfInfo = () => {
		const selfInfo = JSON.parse(localStorage.getItem('selfInfo'))
		getSelfInfo(selfInfo.id).then(({data: {selfInfo} }) => {
			console.log('getSelfInfo => ',selfInfo)
			this.setState({
				selfInfo
			})
		})
	}
	componentDidMount() {
		this.handleInitSelfInfo()
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { id } = this.state.selfInfo;
				updateSelfInfo(id, values).then(({ data }) => {
					message.success(data.message)
					this.setState({
						changePassword : false
					})
					this.handleInitSelfInfo()
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
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('new_password')) {
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
	handleInputChange = (event) => {
		const { name,value } = event.target;
		this.setState({
			selfInfo: { ...this.state.selfInfo,[name]: value }
		})
	}

	checkOriginPassword = () => {
		const form = this.props.form;
		const originPs = form.getFieldValue('password');
		checkoutPassword({username: this.state.selfInfo.username,password: originPs}).then(res => {
			console.log(res)
			if(res.data.type == 1){
				message.success(res.data.message)
				this.setState({
					changePassword: !this.state.changePassword,
				})
			}else{
				message.error(res.data.message)
			}
		}).catch(err => {
			console.log(err)
		})
		
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { selfInfo,changePassword } = this.state;
		return (
			<div className="wrap inner-wrap" style={{paddingTop: 100}}>
				<Form onSubmit={this.handleSubmit} className="login-form inner-login-form">
				<div className="login-title">个人信息</div>
				<FormItem>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: '请输入用户名!' }],
						initialValue: selfInfo.username
					})(
						<Input name="username" 
						onChange={this.handleInputChange}
						disabled={true} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('phone', {
						rules: [{ required: true, message: '请输入手机号!' }],
						initialValue: selfInfo.phone
					})(
						<Input  prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('address', {
						rules: [{ required: true, message: '请输入住址!' }],
						initialValue: selfInfo.address
					})(
						<Input  prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="住址" />
					)}
				</FormItem>
				<FormItem style={{width: '300px'}}>
					{getFieldDecorator('password', {
						rules: [{ required: true }],
					})(
						<Input disabled={changePassword} type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
						placeholder="请输入原始密码" />
					)}
					<Button disabled={changePassword} className="change-password" style={{float: "right"}} onClick={this.checkOriginPassword}>检验原始密码</Button>
				</FormItem>
				{
					changePassword && <div>
						<FormItem>
							{getFieldDecorator('new_password', {
								rules: [{ required: true, message: '请输入密码!' },{
									validator: this.validateToNextPassword
								}],
							})(
								<Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="密码" />
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
					</div>
				}
				<FormItem>
					<Button disabled={!changePassword} onClick={this.handleSubmit} type="primary" htmlType="submit" className="login-form-button">
						保存
					</Button>
				</FormItem>
			</Form>
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
