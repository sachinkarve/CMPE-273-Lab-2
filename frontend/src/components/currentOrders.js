import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login.js';
import OwnerSignup from './OwnerSignup.js';
import CustomerSignup from './CustomerSignup.js';
import Profile from './Profile.js';
import OwnerProfile from './OwnerProfile.js'
import Navbar from './Navbar.js';
import Home from './Home.js';
import Cart from './Cart.js';
import FileUploader from './FileUpload.js';
import CustomerProfile from './CustomerProfile'
import Landing from './Landing'
import URL from '../config'

//redux not required for now

class CurrentOrders extends Component {
    render() {
        return (
            < div >
            <Navbar/>
                <h1>Current orders</h1>
            </div >
        )
    }
}
export default CurrentOrders;