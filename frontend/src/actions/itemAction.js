import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from './types'
import URL from '../config'
import axios from 'axios'

export const addItemAction = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.post(`${URL}/item/additem`, data)
        .then(response => response.data)
        .then(responseStatus => dispatch(
            {
                type: ADD_ITEM,
                payload: responseStatus
            }
        )

        ).catch(err => {
            return dispatch({
                type: ADD_ITEM,
                payload: err.data
            })
        });
}


export const updateItemAction =(data)=>dispatch=>{
    console.log(`*****-----in action update-----******`);
    console.log(data);
    axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.post(`${URL}/item/update`, data)
        .then(response => response.data)
            .then(responseStatus => dispatch({
                type: UPDATE_ITEM,
                    payload : responseStatus
            })).catch(err =>dispatch({
                type : UPDATE_ITEM ,
                payload : err.data
            }));
}


export const deleteItemAction = (data)=> dispatch=>{
    console.log(`*****-----in action delete-----******`);
    console.log(data);

    axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.post(`${URL}/item/deleteitem`, data)
        .then(response => response.data)
        .then(responseStatus => dispatch({
            type: DELETE_ITEM,
                payload : responseStatus
        })).catch(err =>dispatch({
            type : DELETE_ITEM ,
            payload : err.data
        }));


}


