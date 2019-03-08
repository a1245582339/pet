import React, { Component } from 'react';
import { base_url } from '../config'
import { addSliderImg,sliderImgList,delSliderImg,getPetList} from '../http';
import { Table, message, Modal, Button, Avatar } from 'antd';
const confirm = Modal.confirm;
class PetList extends Component {
    state = {
        petArr: [],
        showModal: false,
        allSliderImg: [],
        selectedRows: []
    }
    componentDidMount() {
        this.getData()
    }
    
    getData = () => {
        sliderImgList().then(({data: { allSliderImg }}) => {
            this.setState({
                allSliderImg
            })
        }).catch(err => {
            console.log('error ==>>>',err)
        })
        getPetList().then(({data:{petList}}) => {
            this.setState({
                petArr: petList
            })
        }).catch(error => {
            console.log('getPetList error=> ', error)
        })
    }


    render() {
        let {showModal,allSliderImg,petArr} = this.state;
        const allSliderImgPetId = allSliderImg.map(item => item.pet_id)
        const canAddSliderPet = petArr.filter(item => !allSliderImgPetId.includes(item.id + ''))
        const columns = [
            {
                title: '图片',
                dataIndex: 'image',
                key: 'image',
                render: text => <img alt="轮播图" style={{width: '100px',height: 'auto'}} src = {`${base_url}${text}`} ></img>,
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={e => this.showDeleteConfirm(e,record.id,allSliderImg)}>删除</a>
                    </span>
                ),
            }];
        const sliderColumns = [
            {
                title: '图片',
                dataIndex: 'image',
                key: 'image',
                render: text => <Avatar src = {`${base_url}${text}`} ></Avatar>,
            },
            {
                title: '名字',
                key: 'name',
                dataIndex: 'name',
            }];

        const self = this;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                self.setState({
                    selectedRows
                })
            }
        };
        return (
            <div>
                <Button className="handle-btn" onClick={e => this.handleShowAddPetModal(e)}>添加轮播图</Button>
                <Table  columns={columns} dataSource={allSliderImg} />
                <Modal  title="添加到轮播图"
                        visible={ showModal }
                        onOk={this.handleSubmit}
                        onCancel={this.handleModalCancel}
                >
                    {
                        canAddSliderPet.length > 0 
                        ? <Table rowSelection={rowSelection}  columns={sliderColumns} dataSource={canAddSliderPet} />
                        : <span>没有可添加的宠物</span>
                    }
                    
                </Modal>
            </div>
        );   
    }
    handleShowAddPetModal(e){
        e.preventDefault()
        this.setState({
            showModal: true,
        })
    } 

    handleModalCancel = () => {
        this.setState({
            showModal: false,
        })
    }

    handleSubmit = (data) => {
        const { selectedRows } = this.state;
        addSliderImg({selectedRows}).then( ({data: {message: resMessage}}) => {
            message.success(resMessage)
            this.setState({ showModal: false})
            this.getData()
        }).catch(err => {
            console.log('addSliderImg err ==>>',err)
        })
        
    }

    showDeleteConfirm(e,id,allSliderImg){
        e.preventDefault()
        let self = this;
        confirm({
            title: '确认要删除该宠物?',
            content: '删除后不可恢复',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                delSliderImg(id).then(res => {
                    console.log('res => ',res)
                    self.setState({
                        allSliderImg: allSliderImg.filter(item => item.id !== id)
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
}

export default PetList;

