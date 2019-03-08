import React ,{Component}from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu , Icon ,Button} from 'antd';
import ContentMain from '../layout/content'
const { Header, Content, Sider  } = Layout;
export default class Home extends Component {
	state = {
		collapsed: false,
	};
	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}
	render() {
		const { role } = JSON.parse(localStorage.getItem('selfInfo'));
		const { collapsed } = this.state;
		console.log('this props ', this.props.location.pathname)
		let menuArr = [
			{id: 1 , name: '管理员管理', icon : 'team',  link: '/home/adminManage'},
			{id: 2 , name: '宠物分类',   icon: 'radar-chart',  link    : '/home/petCategory'},
			{id: 3 , name: '宠物信息',   icon: 'file-exclamation',  link    : '/home/petList'},
			{id: 4 , name: '用户管理',   icon: 'usergroup-add',  link    : '/home/userList'},
			{id: 5 , name: '个人信息',   icon: 'user',  link    : '/home/selfInfo'},
			{id: 6 , name: '领养申请',   icon: 'shopping',  link    : '/home/order'},
			{id: 7 , name: '首页轮播图',   icon: 'picture',  link    : '/home/sliderImg'},
		]
		menuArr = role === 2 ? menuArr : menuArr.filter(item => item.id !== 1)
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} >
					<div className="logo">{!collapsed ? '后台管理' : '管理'}</div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						{
							menuArr.map(item => (
								<Menu.Item key={item.id}>
									<Icon type={item.icon} />
									{ !collapsed && (<Link className="menu-item" to={item.link}> {item.name} </Link>) }
								</Menu.Item>
							))
						}
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }} >
							<Button style={{float: 'right',margin: '16px 30px 0 0'}} onClick={this.handleLogout}>退出</Button>
					</Header>
					<Content style={{ padding: '20px' }}>
						<ContentMain />
					</Content>
				</Layout>
		  	</Layout>
		)
	}
	handleLogout = () => {
		localStorage.removeItem('token')
		this.props.history.replace('/login')
	}
}

