import { PLACEORDER , RESTAURANTSEARCH} from '../actions/types'

const initialState = {
    orderState: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PLACEORDER:
            return {
                ...state,
                orderState: action.payload
            }
            break;

        case RESTAURANTSEARCH:
            return {
                ...state,
                orderState: action.payload
            }
            break;

        // case :
        //     return {
        //         ...state,
        //         orderState: action.payload
        //     }
        //     break;

        default:
            return {
                ...state
            }
            break;
    }
}