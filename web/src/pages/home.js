import React ,{Component}from 'react';
import {Switch ,Route,Link } from 'react-router-dom'
import { Layout, Menu, Button, Input, Carousel} from 'antd';
import HomeContent from '../routes/home'
import { base_url } from '../config'
import { getPetCategory ,sliderImgList} from '../http'
const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
export default class Home extends Component {
	state = {
		allPetCategory: [],
		searchValues: "",
		searchRes: [],
		allSliderImg: []
	}
	handleSearch = (e) => {
		e.preventDefault();
		const {searchValues} = this.state;
		if(!searchValues.trim())return ;
		this.child.handleSearch(searchValues);
	}
	componentDidMount() {
		getPetCategory().then(({data: { allPetCategory }}) => {
            this.setState({
                allPetCategory
            })
		})
		sliderImgList().then(({data: { allSliderImg }}) => {
			this.setState({
				allSliderImg
			})
		}).catch(err => {
			console.log('res sliderImgList ==>>',err)
		})
	}

	handleLogout = (event) => {
		event.preventDefault();
		localStorage.removeItem('token')
		this.props.history.replace('/home')
	}
	handleLogin = () => {
		this.props.history.replace('/login')
	}
	handleSearchChange = (event) => {
		const { name,value } = event.target;
		this.setState({
			[name]: value
		})
	}
	getPetList = (menuId) => {
		this.props.history.push({
			pathname: `/home/${menuId}`,
			params: {
				id: menuId
			}
		})
	}
	render() {

		console.log('------->>>>',this.props.location.pathname)
		const showSliderImg = this.props.location.pathname === '/home';
		const { allPetCategory, allSliderImg } = this.state;
		const statusLogin =  (
			<span>
				<Link to="/selfInfo" style={{marginRight: "10px"}}>个人信息</Link>
				<Link to="" onClick={this.handleLogout}>退出</Link>
			</span>
		)
		return (
			<Layout className="layout" style={{background: "#fff"}}>
				<div className="slogan">
					每一个宠物都值得被认真对待
					<div className="search-wrap">
						<Input name="searchValues" placeholder="宠物姓名" onChange={this.handleSearchChange} className="search" /><Button onClick={this.handleSearch}>搜索</Button>
					</div>
				</div>
				<Header className="header">
					<Menu
						mode="horizontal"
						onClick={this.handleClick}
						defaultSelectedKeys={['0']}
						style={{ lineHeight: '50px' }}
					>
						<Menu.Item key="0">
							<Link to='/home'>
								首页
							</Link>
						</Menu.Item>
						 
						{ allPetCategory.map(menu => 
								<SubMenu  key={menu.id} title={<span className="submenu-title-wrapper">{menu.name}</span>}>
								{
									menu.pet_breed.map(item => <Menu.Item key={item.id}>
										<Link to={`/home/${menu.id}/${item.id}?cate=${menu.name}?breed_id=${item.id}`}>
											{item.name}
										</Link>
									</Menu.Item>)
								}
								</SubMenu>
						)}
						<Menu.Item key="myself">
							<Link to='/home/self/all'>
								我的认领
							</Link>
						</Menu.Item>
					</Menu>
					
					<div className="admin-layout">
						{
							localStorage.getItem('token')
								? statusLogin
								: (<span><Link to="/login">登录</Link> <Link to="/register">注册</Link></span>)
						}
					</div>
				</Header>
				{
					showSliderImg && <Carousel autoplay>
					{
						allSliderImg.map(item => (
							<div key={item.id}>
								<img src={`${base_url}${item.image}`} alt=""/>
								<img src={`${base_url}${item.image}`} alt=""/>
								<img src={`${base_url}${item.image}`} alt=""/>
								<img src={`${base_url}${item.image}`} alt=""/>
							</div>
						))
					}
					</Carousel>
				}
				
				<Content style={{ padding: '0 120px' }}>
					<div style={{ background: '#fff', padding: 0, minHeight: 560}}>
						<Switch>
								<Route path='/home/:id/:breed_id' render={(props) => ( <HomeContent ref={r => this.child = r} {...props}  />)}/>
								<Route path='/home' render={(props) => ( <HomeContent ref={r => this.child = r} {...props}  />)}/>
						</Switch>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					选择宠物就是选择家人 ©2018 
				</Footer>
		  </Layout>
		)
	}

	
}
