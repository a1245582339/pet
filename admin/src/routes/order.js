import React, { Component } from 'react';
import { Table, Divider, Avatar, Tag, message, Modal} from 'antd';
import { getPetOrderList,updateApplyForById,delOrder } from '../http';
import { base_url } from '../config'
const confirm = Modal.confirm;

const orderStatus = {
    0 : "审批中",
    1 : "审批通过",
    2 : "未通过审批"
}
class Order extends Component {
    state = {
        orderArr: []
    }
    componentDidMount() {
        getPetOrderList().then(({data: { applyForList }}) => {
            console.log('getPetOrderList res => ',applyForList)
            this.setState({
                orderArr: applyForList
            })
        })
    }
    handleChangeOrderStatus = (e,record,status) => {
        e.preventDefault()

        console.log('record ====>>>>',record)
        const {id,pet_id} = record;
        updateApplyForById({id,pet_id,status}).then(res => {
            this.setState({
                orderArr: this.state.orderArr.map(item => {
                    return item.id === id
                        ? {...item, status}
                        : item
                })
            })
        }).catch(err => {
            console.error('updateApplyForById err ==>' ,err)
        })
    }
    handleDelOrder = (e,id) => {
        e.preventDefault();
        const that = this;
        confirm({
            title: '确认要删除这条信息',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                delOrder(id).then(({data: {message: delMes}}) => {
                    message.success(delMes)
                    that.setState({
                        orderArr: that.state.orderArr.filter(item => item.id !== id)
                    })
                }).catch(err => {
                    console.log('handleDelOrder err ====>>>',err)
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    render() {
        const {orderArr} = this.state;
        const columns = [{
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '宠物名称',
            dataIndex: 'pet_name',
            key: 'pet_name',
        },
        {
            title: '宠物图片',
            dataIndex: 'pet_image',
            key: 'pet_image',
            render: text => <Avatar  src = {`${base_url}${text}`} ></Avatar>,
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
            render: text => <Tag color="blue">{orderStatus[text]}</Tag>,
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    {
                        record.status === 0 
                        ? ( <span>
                                <a onClick={e => this.handleChangeOrderStatus(e,record,1)}>允许</a>
                                <Divider type="vertical" />
                                <a onClick={e => this.handleChangeOrderStatus(e,record,2)}>拒绝</a>
                            </span>)
                        : <a onClick={e => this.handleDelOrder(e,record.id)}>删除</a>
                    }
                    
                </span>
            ),
        }];
        return (
            <div>
                <Table columns={columns} dataSource={orderArr} />
            </div>
        );
    }
}



export default Order;