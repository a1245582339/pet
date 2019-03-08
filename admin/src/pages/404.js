import React, { Component } from 'react'
import img404 from '../images/404.png'
export default class componentName extends Component {
    render() {
        return (
            <div onClick={this.goHome}>
                <img style={{width: '100%',height: '100%'}} src={img404} alt=""/>
            </div>
        )
    }
    goHome = () => {
        this.props.history.replace('/home')
    }
}

