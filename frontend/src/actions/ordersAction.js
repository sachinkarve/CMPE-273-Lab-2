import { PLACEORDER, RESTAURANTSEARCH } from './types'
import URL from '../config'
import axios from 'axios'

export const placeOrderActions = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.post(`${URL}/restaurant/placeorder`, data)
        .then(response => response.data)
        .then(responseStatus => dispatch(
            {
                type: PLACEORDER,
                payload: responseStatus
            }
        )).catch(err => {
            return dispatch({
                type: PLACEORDER,
                payload: err.data
            })
        });
}



export const restaurantSearchAction = (data) => dispatch => {


    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.get(`${URL}/restaurant/searchrestaurant/${data}`)
        .then(response => response.data)
        .then(responseStatus => dispatch(
            {
                type: RESTAURANTSEARCH,
                payload: responseStatus
            }
        )).catch(err => {
            return dispatch({
                type: RESTAURANTSEARCH,
                payload: null
            })
        });
}


