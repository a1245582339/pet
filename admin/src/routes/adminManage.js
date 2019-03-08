import React, { Component } from 'react';
import { getAllAdmin ,delAdmin,register } from '../http'
import { Table, message, Modal,Button, Tag} from 'antd';

import WrappedNormalLoginForm from './adminManage/addManageFrom'
const confirm = Modal.confirm;
class AdminManage extends Component {
    state = {
        adminArr: [],
        showAddModal: false,
    }
    componentDidMount() {
        const selfInfo = JSON.parse(localStorage.getItem('selfInfo'))
        getAllAdmin('admin').then(({data:{admins}}) => {
            this.setState({
                adminArr: admins.filter(item => item.id !== selfInfo.id)
            })
        }).catch(error => {
            console.log('getAllAdmin => ', error)
        })
    }
    render() {
        let {adminArr,showAddModal} = this.state;
        const columns = [
            { title: '管理员',  key: 'username',  dataIndex: 'username',
                render: (text, record) => ( <span>{text} {record.role === 2 && <Tag color="blue">超级管理员</Tag>}</span> ),
            },
            { title: '电话',    dataIndex: 'phone', key: 'phone', }, 
            { title: '地址',    dataIndex: 'address', key: 'address', },
            { title: '操作',  key: 'action',
                render: (text, record) => (
                    <span><a onClick={e => this.showDeleteConfirm(e,record.id,adminArr)}>删除</a></span>
                ),
            }];
        return (
            <div>
                <Button className="handle-btn" onClick={e => this.handleEditAdmin(e)}>添加管理员</Button>
                <Table columns={columns} dataSource={adminArr} />

                <WrappedNormalLoginForm 
                    showAddModal = {showAddModal}  
                    closeAddModel = {this.closeAddModel}
                    submitAddForm = {this.submitManageFrom}
                ></WrappedNormalLoginForm>
            </div>
        );   
    }


    handleEditAdmin(e){
        e.preventDefault()
        this.setState({
            showAddModal: true,
        })
    } 

    closeAddModel = () => {
        this.setState({
            showAddModal: false
        })
    }

    showDeleteConfirm(e,id,adminArr){
        e.preventDefault()
        let self = this;
        confirm({
            title: '确认要删除改管理员?',
            content: '删除后不可恢复',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                delAdmin(id).then(res => {
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
    submitManageFrom = (data) => {
        console.log('from data => ',data)
        register(data).then(res => {
            message.success(res.data.message);
            this.setState({
                showAddModal: false,
                adminArr: [...this.state.adminArr,data]
            })
        }).catch(err => {
            message.error(err)
        })
    }
   
}

export default AdminManage;