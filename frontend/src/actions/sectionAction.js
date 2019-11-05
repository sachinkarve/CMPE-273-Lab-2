import { ADD_SECTION, DELETE_SECTION, UPDATE_SECTION } from './types'
import URL from '../config'
import axios from 'axios'

export const addSectionAction = (data) => dispatch => {

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.post(`${URL}/section/addsection`, data)
        .then(response => response.data)
        .then(responseStatus => dispatch(
            {
                type: ADD_SECTION,
                payload: responseStatus
            }
        )).catch(err => {
            return dispatch({
                type: ADD_SECTION,
                payload: err.data
            })
        })
}


export const updateSectionAction = (data) => dispatch => {
    console.log(`*****-----in action update-----******`);
    console.log(data);


    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.post(`${URL}/section/editsection`, data)
        .then(response => response.data)
        .then(responseStatus => dispatch({
            type: UPDATE_SECTION,
            payload: responseStatus
        })).catch(err => dispatch({
            type: UPDATE_SECTION,
            payload: err.data
        }));
}


export const deleteSectionAction = (data) => dispatch => {
    console.log(`*****-----in action delete-----******`);
    console.log(data);


    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.post(`${URL}/section/deletesection`, data)
        .then(response => response.data)
        .then(responseStatus => dispatch({
            type: DELETE_SECTION,
            payload: responseStatus
        })).catch(err => dispatch({
            type: DELETE_SECTION,
            payload: err.data
        }));
}


