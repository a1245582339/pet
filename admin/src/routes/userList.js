import React, { Component } from 'react';
import { getAllAdmin ,delAdmin,register } from '../http'
import { Table, message, Modal, Input} from 'antd';
const confirm = Modal.confirm;
class UserList extends Component {
    state = {
        adminArr: [],
        showEditModal: false,
        newAdminData: {}
    }
    componentDidMount() {
        getAllAdmin(0).then(({data:{admins}}) => {
            this.setState({
                adminArr: admins
            })
        }).catch(error => {
            console.log('getAllAdmin => ', error)
        })
    }
    render() {
        let {adminArr,showEditModal,newAdminData} = this.state;
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            }, {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },{
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={e => this.showDeleteConfirm(e,record.id,adminArr)}>删除</a>
                    </span>
                ),
            }];
        return (
            <div>
                <Table columns={columns} dataSource={adminArr} />
                <Modal  title="添加管理员"
                        visible={showEditModal}
                        onOk={this.handleEditOk}
                        onCancel={this.handleEditCancel}
                >
                <p>
                    <label className="edit-input-label" htmlFor="username">管理员 :</label>
                    <Input name="username" onChange={this.handleEditInputChange} value={newAdminData.username} placeholder="管理员名称" type="text"/>
                </p>
                <p>
                    <label className="edit-input-label" htmlFor="phone">电话 :</label>
                    <Input name="phone" onChange={this.handleEditInputChange} value={newAdminData.phone} placeholder="电话" type="text"/>
                </p>
                <p>
                    <label className="edit-input-label" htmlFor="password">密码 :</label>
                    <Input name="password" onChange={this.handleEditInputChange} value={newAdminData.password} placeholder="密码" type="password"/>
                </p>
                <p>
                    <label className="edit-input-label" htmlFor="address">住址 :</label>
                    <Input name="address" onChange={this.handleEditInputChange} value={newAdminData.address} placeholder="住址" type="text"/>
                </p>
                </Modal>
            </div>
        );   
    }
    showDeleteConfirm(e,id,adminArr){
        e.preventDefault()
        let self = this;
        confirm({
            title: '确认要删除该用户?',
            content: '删除后不可恢复',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                delAdmin(id).then(res => {
                    console.log('res => ',res)
                    self.setState({
                        adminArr: adminArr.filter(item => item.id !== id)
                    })
                    message.success(res.data.message)
                }).catch(error => {
                    message.error(error)
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    handleEditInputChange = (event) => {
        const {name,value} = event.target;
        this.setState({
            newAdminData: {...this.state.newAdminData,[name]:value}
        })
    }
    handleEditOk = () => {
        console.log('newAdminData',this.state.newAdminData)
        const {newAdminData} = this.state;
        register(newAdminData).then(res => {
            message.success(res.data.message);
            this.setState({
                showEditModal: false,
                adminArr: [...this.state.adminArr,newAdminData]
            })
        }).catch(err => {
            message.error(err)
        })
    }
    handleEditCancel = () => {
        this.setState({
            showEditModal: false
        })
    }
}

export default UserList;