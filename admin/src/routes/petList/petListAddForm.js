import React from 'react'
import { Form, Input, Modal, Upload,Cascader,Icon} from 'antd';
import { base_url } from '../../config'
const FormItem = Form.Item;
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}
class addMangeFrom extends React.Component {
	state = {
		imageUrl: '',
		loading: false,
	}

	handleSubmit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const {name,age,area,cateAndBreed,pet_desc,pet_image} = values;
				const petData = {
					name,age,area,pet_desc,
					category_id: cateAndBreed[0],
					breed: cateAndBreed[1],
					image: pet_image.file ? pet_image.file.response.images_path : pet_image
				}
				this.props.handleSubmit(petData)
				this.setState({
					imageUrl: ''
				})
			}
		});
	}
	cleanFormData = () => {
		this.setState({
			imageUrl: ''
		})
		this.props.form.resetFields()
		this.props.onCancel()
	}


	verifyMinLength = (rule, value, callback) => {
		if (value && value.length < 2) {
			callback('至少两位');
		} else {
			callback();
		}
    }
    
    handleUploadChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
				imageUrl,
                loading: false,
            }));
        }
	}
	

	
	render() {
		const { getFieldDecorator } = this.props.form;
		const { showModal,CascaderCateList,currentPetData} = this.props;
		const { imageUrl } = this.state;
		const uploadButton = (
            <span>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <span className="ant-upload-text">Upload</span>
            </span>
		);
		const formItemLayout = {
			labelCol: {
			  xs: { span: 6 },
			  sm: { span: 6 },
			},
			wrapperCol: {
			  xs: { span: 24 },
			  sm: { span: 16 },
			},
		};
		return (
			<Modal  title="添加宠物"
                        visible={ showModal }
                        onOk={this.handleSubmit}
                        onCancel={this.cleanFormData}
            >
            <Form onSubmit={this.handleSubmit}>
					<FormItem {...formItemLayout} label="宠物名称">
						{getFieldDecorator('name', {
							rules: [{ required: true, message: '请输入宠物名称!' },
							{validator: this.verifyMinLength} ],initialValue: currentPetData.name })(
							<Input name="name"  placeholder="宠物名称" type="text"/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="照片 ">
						{/* <label className="edit-input-label" style={{ float: 'left',marginRight: 20}} htmlFor="pet_image">照片 :</label> */}
						{!imageUrl && currentPetData.image && <img style={{ float: 'left'}} className="pet-image" src={`${base_url}${currentPetData.image}`} alt="avatar" />}
						{getFieldDecorator('pet_image', {
							rules: [{ required: currentPetData.image ? false : true, message: '请输入宠物照片 !' }],
							initialValue: currentPetData.image
						})(
							<Upload className="pet-img-uploader pet-img-uploader-add" 
								name="pet_image" 
								listType="picture-card"
								showUploadList={false}
								action="/api/upload"
								onChange={(info) => this.handleUploadChange(info)}
							>
							{imageUrl ? <img className="pet-image" style={{ float: 'left'}} src={imageUrl} alt="avatar" /> : uploadButton}
							</Upload>
						)}
					</FormItem>
					

					<FormItem {...formItemLayout} label="种类/品种">
						{getFieldDecorator('cateAndBreed', {
							rules: [{ required: true, message: '请选择种类/品种!' }],initialValue: [currentPetData.category_id,Number(currentPetData.pet_breed)]
						})(
							<Cascader name="cateAndBreed" placeholder="种类/品种" options={CascaderCateList} onChange={this.onChange}></Cascader>
						)}
					</FormItem>


					<FormItem {...formItemLayout} label="宠物年龄">
						{getFieldDecorator('age', {rules: [{ required: true, message: '请输入宠物年龄!' }],initialValue: currentPetData.age}
						)(<Input name="age"  placeholder="宠物年龄"  type="number"/>)}
					</FormItem>

					<FormItem {...formItemLayout} label="所在地区"> 
						{getFieldDecorator('area', {
							rules: [{ required: true, message: '请输入地区!' },
							{validator: this.verifyMinLength}
						],initialValue: currentPetData.area
						})(
							<Input name="area"  placeholder="所在地区"  type="text"/>
						)}
					</FormItem>

					<FormItem  {...formItemLayout} label="宠物描述">
						{getFieldDecorator('pet_desc', {
							rules: [{ required: true, message: '请输入描述!' },
							{validator: this.verifyMinLength}
						],initialValue: currentPetData.pet_desc
						})(
							<Input name="pet_desc"  placeholder="宠物描述"  type="text"/>
						)}
					</FormItem>
					
			</Form>
                </Modal>
		);
	}
}

const WrappedAddPetFrom = Form.create()(addMangeFrom);

export default WrappedAddPetFrom;

