import React from 'react'
import { Form, Modal, Upload,Icon} from 'antd';
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
				const { pet_image } = values;
				const petData = {
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
		const { showModal,currentPetData} = this.props;
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
			<Modal  title="轮播图操作"
                        visible={ showModal }
                        onOk={this.handleSubmit}
                        onCancel={this.cleanFormData}
            >
                <Form onSubmit={this.handleSubmit}>
					<FormItem {...formItemLayout} label="轮播图图片">
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
			    </Form>
            </Modal>
		);
	}
}

const WrappedAddPetFrom = Form.create()(addMangeFrom);

export default WrappedAddPetFrom;

