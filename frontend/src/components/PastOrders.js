import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Navbar from './Navbar';
import CustomerPastOrders from './CustomerPastOrders';
import OwnerPastOrders from './OwnerPastOrders';
import URL from '../config'

class PastOrders extends Component {
    componentWillMount(){
        document.title = "Your Orders";
    }
    render() {
        let ordersComponent = null;
        let redirectVar = null;
        if (localStorage.getItem("user_id")) {
            if (localStorage.getItem("is_owner") === "1")
                ordersComponent = <OwnerPastOrders/>
            else
                ordersComponent = <CustomerPastOrders />
        }
        else {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navbar /><br/>
                {ordersComponent}
            </div>
        )
    }
}
export default PastOrders;