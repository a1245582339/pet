import React, { Component } from 'react';
import { base_url } from '../config'
import { getPetList, addPet, delPet, updatePet ,getPetCategory} from '../http';
import { Table, message, Modal,Button,Divider,Avatar,Tag} from 'antd';
import WrappedAddPetFrom from './petList/petListAddForm'
const confirm = Modal.confirm;
const petStatus = {
    0 : "待认领",
    1 : "认领中",
    2 : "领养中",
    3 : "未通过审批"
}
class PetList extends Component {
    state = {
        petArr: [],
        showModal: false,
        currentPetData: {},
        loading: false,
        allPetCategory: [],
        CascaderCateList: [],
        modalType: ''
    }
    componentDidMount() {
        getPetCategory().then(({data: { allPetCategory }}) => {
            this.setState({
                allPetCategory,
                CascaderCateList: allPetCategory.map(item => {
                    return {
                        value: item.id,
                        label: item.name,
                        children: item.pet_breed.map(breed => {
                            return {
                                value: breed.id,
                                label: breed.name,
                            }
                        })
                    }
                }),
            })
        }).catch(error => {
            console.log('getPetCategory error=> ', error)
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
        let {petArr,showModal,currentPetData,CascaderCateList} = this.state;
        const columns = [
            {
                title: '图片',
                dataIndex: 'image',
                key: 'image',
                render: text => <Avatar src = {`${base_url}${text}`} ></Avatar>,
            },
            {
                title: '名字',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            }, 
            {
                title: '地区',
                dataIndex: 'area',
                key: 'address',
            },
            {
                title: '种类',
                dataIndex: 'category_name',
                key: 'category_name',
            },
            {
                title: '描述',
                dataIndex: 'pet_desc',
                key: 'pet_desc',
                render: text => (text || "暂无描述")
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: text => <Tag color="blue">{petStatus[text]}</Tag>,
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        {
                            record.status === 2
                            ? <a className="not-handle">编辑</a>  //sds
                            : <a onClick={e => this.handleEditPet(e,record.id,petArr)}>编辑</a>
                        }
                        <Divider type="vertical" />
                        <a onClick={e => this.showDeleteConfirm(e,record.id,petArr)}>删除</a>
                    </span>
                ),
            }];
        return (
            <div>
                <Button className="handle-btn" onClick={e => this.handleShowAddPetModal(e)}>添加宠物</Button>
                <Table columns={columns} dataSource={petArr} />
                <WrappedAddPetFrom  currentPetData={currentPetData} 
                                    showModal={ showModal }
                                    handleSubmit={(data) => this.handleSubmit(data)} 
                                    onCancel={this.handleModalCancel} 
                                    CascaderCateList={CascaderCateList}>
                </WrappedAddPetFrom>
            </div>
        );   
    }


    handleShowAddPetModal(e){
        e.preventDefault()
        this.setState({
            showModal: true,
            modalType: 'addPet'
        })
    } 

    handleEditPet(e,id,petArr){
        e.preventDefault()
        const currentPetDate = petArr.find(item => item.id === id);
        this.setState({
            showModal: true,
            modalType: 'editPet',
            currentPetData: {...currentPetDate}
        })
    } 

    handleModalCancel = () => {
        this.setState({
            showModal: false,
            modalType: '',
            currentPetData: {}
        })
    }

    handleSubmit = (data) => {
        const { modalType } = this.state;
        if(modalType === 'addPet'){
            console.log('addPet')
            this.handleAddPetOk(data)
        }else{
            console.log('editPet')
            this.handleEditPetOk(data)
        }
    }

    handleAddPetOk = (newPetData) => {
        console.log('newPetData ==>>>',newPetData)
        const category_name = this.state.allPetCategory.find(item => item.id === newPetData.category_id).name;
        addPet(newPetData).then(res => {
            const {insertId : id} = res.data;
            message.success(res.data.message);
            this.setState({
                showModal: false,
                petArr: [...this.state.petArr,{...newPetData,status: 0,id,category_name}]
            })
        }).catch(err => {
            console.log('addPet err',err)
        })
    }

    handleEditPetOk = (currentPetData) => {
        const {id: pet_id ,status ,category_name} = this.state.currentPetData;
        currentPetData.id = pet_id;
        updatePet(currentPetData).then(({data: {message : updatePetResMessage}}) => {
            message.success(updatePetResMessage)
            this.setState({
                showModal: false,
                petArr: this.state.petArr.map(pet => {
                    return pet.id === currentPetData.id
                        ? {...currentPetData,status,category_name}
                        : pet
                })
            })
        }).catch(err => {
            console.error('updatePet ==>>>',err)
        })
    }

    showDeleteConfirm(e,id,petArr){
        e.preventDefault()
        let self = this;
        confirm({
            title: '确认要删除该宠物?',
            content: '删除后不可恢复',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                delPet(id).then(res => {
                    console.log('res => ',res)
                    self.setState({
                        petArr: petArr.filter(item => item.id !== id)
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

