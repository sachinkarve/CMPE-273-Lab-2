import { SIGNUP, OWNERSIGNUP } from './types'
import URL from '../config'
import axios from 'axios'

export const signupCustomerAction = (data) => dispatch => {
console.log(`*****----data in Action-----*****`);
console.log(data);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.post(`${URL}/signup/customer`, data)
        .then(response => dispatch(
            {
                type: SIGNUP,
                payload: 1
            }
        )).catch(err => {
            return dispatch({
                type: SIGNUP,
                payload: 0
            })
        });
}




export const signupOwnerAction = (data) => dispatch => {
    console.log(`*****----data in Action-----*****`);
    console.log(data);
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.post(`${URL}/signup/owner`, data)
        .then(response => dispatch(
            {
                type: OWNERSIGNUP,
                payload: 1
            }
        )).catch(err => {
            return dispatch({
                type: OWNERSIGNUP,
                payload: 0
            })
        });    
    }
    