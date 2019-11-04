import React, { Component } from 'react';
import { Redirect } from 'react-router';
import OwnerHome from './OwnerHome.js'
import CustomerHome from './CustomerHome.js'


class Home extends Component {

    render() {
        let redirectvar = null;
        let homeRender = null;
        if (localStorage.getItem('token')) {
            
            if (localStorage.getItem("is_owner")==="true") {
                homeRender = <OwnerHome />
            }
            else {
                homeRender = <CustomerHome />
            }
        }
        else {
            redirectvar = <Redirect to="/login" />
        }
        return (
            <div>
                {redirectvar}
                {homeRender}
            </div>
        )
    }
}
export default Home
