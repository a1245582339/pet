import React, { Component } from 'react'
import { Modal,Avatar,Tag,Button} from 'antd';
import { base_url } from '../config';
export default class detail extends Component {
  render() {
    const petStatus = {
      0 : '申请中',
      1 : '领养中',
      2 : '申请未通过'
    }
    return (
      <div>
        <Modal  title="宠物详情"
            visible={this.props.showDetailModal}
            onOk={this.props.onApplyForCb}
            onCancel={this.props.onCancelCb}
            footer={[
                <Button key="back" onClick={this.props.onCancelCb}>取消</Button>,
                <Button key="submit" type="primary" onClick={this.props.onApplyForCb}>
                  认领
                </Button>,
            ]}
        >
        <div className="detail-wrap" style={{width: "60%" ,margin: "0 auto"}}>
            <Avatar shape="square" size={70} src={`${base_url}${this.props.pet.image}`} />
            <div className="detail-list"> <span>名称:</span> {this.props.pet.name}</div>
            <div className="detail-list"> <span>地区:</span>{this.props.pet.area}</div>
            <div className="detail-list"> <span>种类:</span>{this.props.pet.category_name}</div>
            <div className="detail-list"> <span>描述:</span>{this.props.pet.pet_desc}</div>
            { this.props.pet.order_status !== undefined &&  (
              <div className="detail-list">
                <span>状态:</span>
                <Tag color="#ee6f5d">{petStatus[this.props.pet.order_status]}</Tag>
              </div>
              )
            }
        </div>
        
        </Modal>
      </div>
    )
  }
}
