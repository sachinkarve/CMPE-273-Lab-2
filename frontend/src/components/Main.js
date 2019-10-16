import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login.js';
import OwnerSignup from './OwnerSignup.js';
import CustomerSignup from './CustomerSignup.js';
import Profile from './Profile.js';
import OwnerProfile from './OwnerProfile.js'
import Home from './Home.js';
import Cart from './Cart.js';
import FileUploader from './FileUpload.js';
import CustomerProfile from './CustomerProfile'
import Landing from './Landing'
import Menu from './Menu'
import Sections from './Sections'
import Items from './Items'
import Viewitemandsections from './Viewitemandsections'
import Restaurant from './Restaurant'
import ConfirmOrder from './ConfirmOrder'
import CustomerPresentOrders from './CustomerPresentOrders'
import CustomerPastOrders from './CustomerPastOrders'
import PastOrders from './PastOrders'
import Orders from './Orders'


class Main extends Component {
    render() {
        return (
            < div >

                <Route exact path="/order/confirm" component={ConfirmOrder} />

                <Route exact path="/" component={Landing} />
                <Route path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/cart" component={Cart} />
                <Route path="/CustomerPastOrders" component={CustomerPastOrders} />
                <Route path="/CustomerPresentOrders" component={CustomerPresentOrders} />
                <Route path="/fileupload" component={FileUploader} />
                <Route path="/login" component={Login} />
                <Route path="/ownersignup" component={OwnerSignup} />
                <Route path="/updatemenu" component={Menu} />
                <Route path="/restaurant" component={Restaurant} />
                <Route path="/pastorders" component={PastOrders} />
                <Route path="/orders" component={Orders} />


                <Route path="/sections" component={Sections} />
                <Route path="/items" component={Items} />
                <Route path="/viewitemandsections" component={Viewitemandsections} />

                <Route path="/ownerprofile" component={OwnerProfile} />
                <Route path="/customersignup" component={CustomerSignup} />
                <Route path="/customerprofile" component={CustomerProfile} />
            </div >
        )
    }
}
export default Main;