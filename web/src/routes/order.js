import React, { Component } from 'react';
import { Table, Divider, Avatar, Tag, message} from 'antd';
import { getPetOrderList,updateApplyForById,delOrder } from '../http';
import { base_url } from '../config'

const orderStatus = {
    0 : "待申请",
    1 : "审批通过",
    2 : "未通过审批"
}
class Order extends Component {
    state = {
        orderArr: []
    }
    componentDidMount() {
        getPetOrderList().then(({data: { applyForList }}) => {
            this.setState({
                orderArr: applyForList
            })
        })
    }
    handleChangeOrderStatus = (e,id,status) => {
        e.preventDefault()
        updateApplyForById({id,status}).then(res => {
            this.setState({
                orderArr: this.state.orderArr.map(item => {
                    return item.id === id
                        ? {...item, status}
                        : item
                })
            })
        })
    }
    handleDelOrder = (e,id) => {
        e.preventDefault();
        delOrder(id).then(({data: {message: delMes}}) => {
            message.success(delMes)
            this.setState({
                orderArr: this.state.orderArr.filter(item => item.id !== id)
            })
        }).catch(err => {
            console.log('handleDelOrder err ====>>>',err)
        })
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
                                <a onClick={e => this.handleChangeOrderStatus(e,record.id,1)}>允许</a>
                                <Divider type="vertical" />
                                <a onClick={e => this.handleChangeOrderStatus(e,record.id,2)}>拒绝</a>
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