import { SENDMSG, GETMSG } from './types'
import URL from '../config'
import axios from 'axios'

export const sendMsgAction = (data) => dispatch => {



    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.post(`${URL}/messaging/send`, data)
        .then(response => response.data)
        .then(responseStatus => dispatch(
            {
                type: SENDMSG,
                payload: responseStatus
            }
        )).catch(err => {
            return dispatch({
                type: SENDMSG,
                payload: null
            })
        });
}



export const getMsgAction = (data) => dispatch => {

    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.get(`${URL}/messaging/get/${data}`)
    .then(response => response.data)
    .then(responseStatus => dispatch(
        {
            type: GETMSG,
            payload: responseStatus
        }
    )).catch(err => {
        return dispatch({
            type: GETMSG,
            payload: null
        })
    });
}
