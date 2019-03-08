import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom' ;
import Home from '../routes/home'
class Content extends Component {
    render() {
        const { searchRes } = this.props;
        return (
            <div style={{ background: '#fff', padding: 0, minHeight: 560}}>
               <Switch>
                    {/* <Route exact path='/home' component={Home}/> */}
                    <Route exact path='/home' render={(props) => ( <Home {...props} searchRes={searchRes} />)}/>
                    <Route path='/home/:id/:breed_id' component={Home}/>
               </Switch>
            </div>
        );
    }
}

export default Content;