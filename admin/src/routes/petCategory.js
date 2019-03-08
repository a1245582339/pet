import React, { Component } from 'react';
import { getPetCategory,addPetCategory,delPetCategory,updatePetCategory,addPetBreed,delPetBreed} from '../http'
import { Table, message, Modal,Input,Button,Divider, Tag} from 'antd';
const confirm = Modal.confirm;
class PetCategory extends Component {
    state = {
        petCategoryArr: [],
        showEditModal: false,
        showAddModal: false,
        showBreedModal: false,
        currentPetCateName: '',
        currentPetCateId: 0,
        newCategory: '',
        breedName: ''

    }
    componentDidMount() {
        getPetCategory().then(({data:{allPetCategory}}) => {
            this.setState({
                petCategoryArr: allPetCategory
            })
        }).catch(error => {
            console.log('getAllAdmin => ', error)
        })
    }
    render() {
        let {petCategoryArr,showEditModal,newCategory,showAddModal,currentPetCateName,showBreedModal,breedName} = this.state;
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
                width: 160,
            },
            {
                title: '品种',
                dataIndex: 'pet_breed',
                key: 'pet_breed',
                render: (text, record) => {
                    return text && text.map(item => <Tag onClick={(e) => this.showDeleteBreedConfirm(e,item.id,record.id)} key={item.id}>{item.name}</Tag>)
                }
            },
            {
                title: '操作',
                key: 'action',
                width: 300,
                render: (text, record) => (  
                    <span>
                        <a onClick={e => this.handleAddBreed(e,record.id,record.name)}>添加品种</a>
                        <Divider type="vertical" />
                        <a onClick={e => this.handleEditPetCate(e,record.id,record.name)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={e => this.showDeleteConfirm(e,record.id,petCategoryArr)}>删除</a>
                    </span>
                ),
            }];
        return (
            <div>
                <Button className="handle-btn"  onClick={e => this.handleAddPetCate(e)}>添加分类</Button>
                <Table columns={columns} dataSource={petCategoryArr} />
                <Modal  title="添加分类"
                        visible={showAddModal}
                        onOk={this.handleAddCategoryOk}
                        onCancel={() => this.handleModalClose('showAddModal')}
                >
                    <p>
                        <label className="edit-input-label" htmlFor="username">分类名 :</label>
                        <Input name="newCategory" onChange={this.handleInputChange} value={ newCategory } placeholder="分类名称" type="text"/>
                    </p>
                </Modal>
                <Modal  title="编辑分类"
                        visible={showEditModal}
                        onOk={this.handleEditCategoryOk}
                        onCancel={ () => this.handleModalClose('showEditModal')}
                >
                    <p>
                        <label className="edit-input-label" htmlFor="username">分类名 :</label>
                        <Input name="currentPetCateName" onChange={this.handleInputChange} value={ currentPetCateName } placeholder="分类名称" type="text"/>
                    </p>
                </Modal>
                <Modal  title="添加分类品种"
                        visible={showBreedModal}
                        onOk={this.handleAddBreedOk}
                        onCancel={ () => this.handleModalClose('showBreedModal')}
                >
                    <p>
                        <label className="edit-input-label" htmlFor="breedName">品种名称 :</label>
                        <Input name="breedName" onChange={this.handleInputChange} value={ breedName } placeholder="品种名称" type="text"/>
                    </p>
                </Modal>
            </div>
        );   
    }
    showDeleteConfirm(e,id,petCategoryArr){
        e.preventDefault()
        let self = this;
        confirm({
            title: '确认要删除该分类?',
            content: '删除后不可恢复',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                delPetCategory(id).then(res => {
                    if(res.data.type === 1){
                        self.setState({
                            petCategoryArr: petCategoryArr.filter(item => item.id !== id)
                        })
                    }
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
    showDeleteBreedConfirm(e,breed_id,Cate_id){
        e.preventDefault()
        let self = this;
        confirm({
            title: '确认要删除该品种?',
            content: '删除后不可恢复',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                delPetBreed(breed_id).then(res => {
                    if(res.data.type === 1){
                        self.setState({
                            petCategoryArr: self.state.petCategoryArr.map(item => {
                                return item.id === Cate_id 
                                    ? {
                                        ...item,pet_breed: item.pet_breed.filter(breed => breed.id !== breed_id)
                                    }
                                    : item
                            })
                        })
                    }
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
    handleInputChange = (event) => {
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })
    }
    handleAddCategoryOk = () => {
        const {newCategory} = this.state;
        if(!newCategory) { message.warn('分类名不能为空'); return } ;
        addPetCategory({name: newCategory}).then(res => {
            if(res.data.type === 1){
                this.setState({
                    showAddModal: false,
                    newCategory: '',
                    petCategoryArr: [...this.state.petCategoryArr,{name: newCategory,id: res.data.id,pet_breed: []}]
                })
                message.success(res.data.message)
            }else{
                message.warn(res.data.message)
            }
        }).catch(err => {
            console.log('err ==>>>>',err)
        })
    }
    handleModalClose = (type) => {
        this.setState({
            [type]: false,
            breedName: '',
            newCategory: ''
        })
    }
    handleAddPetCate(e,id){
        e.preventDefault();
        this.setState({
            showAddModal: true,
        })
    } 
    handleEditPetCate(e,id,name){
        e.preventDefault();
        this.setState({
            showEditModal: true,
            currentPetCateName: name,
            currentPetCateId: id
        })
    }
    handleEditCategoryOk = () => {
        const {currentPetCateName: name , currentPetCateId: id} = this.state;

        if(!name) { message.warn('分类名不能为空'); return } ;
        updatePetCategory({ id, name}).then(res => {
            message.success(res.data.message)
            this.setState({
                showEditModal: false,
                petCategoryArr: this.state.petCategoryArr.map(item => {
                    return item.id === id ? {...item,name} : item
                })
            })
        }).catch(err => {
            console.log('err ==>>>>',err)
        })
    }

    handleAddBreed = (e,cateId,cateName) => {
        e.preventDefault();
        this.setState({
            showBreedModal: true,
            currentPetCateId: cateId
        })
    }

    handleAddBreedOk = () => {
        const { breedName, currentPetCateId} = this.state;
        addPetBreed({name: breedName, cate_id: currentPetCateId}).then(({data: {id,type,message: resMessage}}) => {

            if(type === 1){
                this.setState({
                    petCategoryArr: this.state.petCategoryArr.map(item => {
                        return item.id === currentPetCateId 
                            ? {...item,'pet_breed':[...item.pet_breed,{id,name: breedName}]}
                            : item
                    }),
                    showBreedModal: false,
                    breedName: ''
                })
            }else{
                message.warn(resMessage)
            }
            
        }).catch(err => {
            console.log('err ===>>>',err)
        })


        
    }
}

export default PetCategory;