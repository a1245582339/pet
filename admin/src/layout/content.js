import React, { Component } from 'react';
import {Route,Switch, Redirect} from 'react-router-dom' ;

import AdminManage from '../routes/adminManage'
import PetCategory from '../routes/petCategory'
import PetList from '../routes/petList'
import UserList from '../routes/userList'
import SelfInfo from '../routes/selfInfo'
import Order from '../routes/order'
import SliderImg from '../routes/sliderImg'

/**
 * history: H.History;
  location: H.Location<S>;
  match: match<Params>;
 */
class Content extends Component {
    render() {
        return (
            <div style={{ background: '#fff', padding: 24 }}>
               <Switch>
                    <Route path='/home/adminManage' component={AdminManage}/>
                    <Route path='/home/petCategory' component={PetCategory}/>
                    <Route path='/home/petList' component={PetList}/>
                    <Route path='/home/userList' component={UserList}/>
                    <Route path='/home/selfInfo' component={SelfInfo}/>
                    <Route path='/home/order' component={Order}/>
                    <Route path='/home/sliderImg' component={SliderImg}/>
                    <Redirect from='/home' to="/home/adminManage" />
                    <Redirect to="/home/adminManage" />
                    {/* todo 404 401 */}
               </Switch>
            </div>
        );
    }
}


export default Content;