import React from 'react'
import { Form, Input,  Radio, Modal} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class addMangeFrom extends React.Component {
	
	handleSubmit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.submitAddForm(values)
			}
		});
	}
	cleanFormData = () => {
		this.props.form.resetFields()
		this.props.closeAddModel()
	}
	validPhone = (rule, value, callback) => {
		if (value && !(/^1[34578]\d{9}$/.test(value))) {
			callback('请输入有效的手机号码');
		} else {
			callback();
		}
	}

	verifyMinLength = (rule, value, callback) => {
		if (value && value.length < 2) {
			callback('至少两位');
		} else {
			callback();
		}
	}
	
	render() {
		const { getFieldDecorator } = this.props.form;
		const { showAddModal } = this.props;
		return (
			<Modal
				title="添加管理员"
				visible={showAddModal}
				onOk={this.handleSubmit}
				onCancel={this.cleanFormData}
			>

			
			<div className="wrap">
				<Form onSubmit={this.handleSubmit}>
					<FormItem>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: '请输入用户名!' },
							{validator: this.verifyMinLength}
						],
						})(
							<Input name="username"   placeholder="管理员名称" type="text"/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码!' },
							{validator: this.verifyMinLength}],
						})(
							<Input name="password"  placeholder="密码" type="password"/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('role', {
							rules: [{ required: true}],
							initialValue: 1
						})(
							<RadioGroup name="role"  >
								<Radio value={1}>普通管理员</Radio>
								<Radio value={2}>超级管理员</Radio>
							</RadioGroup>
						)}
							
					</FormItem>
					<FormItem>
						{getFieldDecorator('phone',
							{
								rules: [{ required: true, message: '请输入手机号码!' },
										{ validator: this.validPhone}],
							})(
								<Input name="phone"  placeholder="电话" type="text"/>
							)
						}
					</FormItem>
					<FormItem>
						{getFieldDecorator('address', {
							rules: [{ required: true, message: '请输入地址!' },
							{validator: this.verifyMinLength}
						],
						})(
							<Input name="address"  placeholder="住址" type="text"/>
						)}
					</FormItem>
					
				</Form>
			</div>
			</Modal>
		);
	}
}

const WrappedAddMangeFrom = Form.create()(addMangeFrom);

export default WrappedAddMangeFrom;
