import { LOGIN } from './types'
import URL from '../config'
import axios from 'axios'

export const loginAction = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${URL}/login`, data)
    .then(response => dispatch(
        {
            type: LOGIN,
            payload: response.data.token
        }
    )).catch(err => {
        return dispatch({
            type: LOGIN,
            payload: "ERROR"
        })
    });
}
