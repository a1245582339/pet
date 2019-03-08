import React, { Component } from 'react';
import { Card, Button, message } from 'antd';
import { getPetList ,applyForPet, getPetCategory, getOrderByUserId, searchPet } from '../http'
import { base_url } from '../config'
import Detail from '../componet/detail'
const { Meta } = Card;

class allPetList extends Component {
    state = {
        loading: false,
        petList: [],
        showDetailModal: false,
        currentPet: {},
        allPetCategory: []
    }
    handleSearch = (petName) => {
        searchPet(petName).then(({data: {petList}}) => {
			this.setState({
				petList
			})
		})
    }
    fetchData(categoryId,breed_id) {
        const token = localStorage.getItem('token');
        if(categoryId === 'self'){
            if(!token){
                message.warning("请先登录!");
                return;
            }
            const {id : user_id} = JSON.parse(localStorage.getItem('selfInfo'))
            getOrderByUserId(user_id).then(({data: { petList }}) => {
                this.setState({
                    petList
                })
            }).catch(err => {
                console.log(err)
            })
        }else{
            const category_id = categoryId || "all";
            getPetList(category_id,breed_id).then(({data: { petList }}) => {
                this.setState({
                    petList
                })
            }).catch(err => {
                console.log(err)
            })
        }
        
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            console.log('this.props.match====--',nextProps.match)
            const {id,breed_id} = nextProps.match.params;
            this.fetchData(id,breed_id);
        } 
    }
    componentDidMount() {
        this.fetchData('all')
        getPetCategory().then(({data: { allPetCategory }}) => {
            this.setState({
                allPetCategory
            })
        })
    }
    applyForPet = (id,status) => {
        const token = localStorage.getItem('token');
        if(!token){ message.warning("请先登录!"); return; }
        const {id : user_id} = JSON.parse(localStorage.getItem('selfInfo'))

        // if(status !== 0){  message.warning("已在认领中,不可重复认领"); return; };

        applyForPet({pet_id: id,user_id}).then(({data: {message: applyForPetRes}}) => {
            message.success(applyForPetRes)
            this.setState({
                petList: this.state.petList.map(pet => {
                    return pet.id === id
                        ? {...pet,status: 1}
                        : pet
                })
            })
        }).catch(err => {
            console.log('applyForPet err===>>',err)
        })
    }
    handlePetDetail = (pet) => {
        console.warn('detail pet =>' ,pet)
        this.setState({
            showDetailModal: true,
            currentPet: pet
        })
    }
    handleModalCancel = () => {
        this.setState({
            showDetailModal: false
        })
    }
    handelApplyForCb = () => {
        const {id,status} = this.state.currentPet;
        this.applyForPet(id,status)
    }
    render() {
        const { petList, showDetailModal, currentPet, allPetCategory} = this.state;
        const PetCard = (pet) =>  (
            <Card
                key={pet.id}
                hoverable
                style={{ width: 240,display: 'inline-block',margin: '20px 24px' }}
                actions={
                    [   
                        <Button onClick={() => {this.handlePetDetail(pet)}}>详情</Button>, 
                        <Button onClick={() => {this.applyForPet(pet.id,pet.status)}}>认领</Button>
                    ]
                }
                cover={<img alt="example" src={`${base_url}${pet.image}`} />}
            >
                <Meta title={`${pet.name}`} description={pet.pet_desc || "暂无描述"}/>
            </Card>
        )
        return (
            <div>
                <Detail  pet={currentPet}  showDetailModal={showDetailModal} onApplyForCb={this.handelApplyForCb} onCancelCb={this.handleModalCancel} ></Detail>
                {
                    allPetCategory.map(cate => {
                        const petArr = petList.filter(pet => pet.category_id === cate.id);
                        return petArr.length > 0 
                            ? <div className="pet-category" key={cate.id}>
                                <div  className="pet-category-name">{cate.name}</div>
                                {petArr.map(item => {  return  PetCard(item)  })}
                            </div>
                            : null
                    })
                }
                {petList.length === 0 ? <div className="no-data-desc">暂无数据</div> : null}
            </div>
        );
    }
}

export default allPetList;