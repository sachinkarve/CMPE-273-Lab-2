import { SENDMSG, GETMSG} from '../actions/types'

const initialState = {
    msgState: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SENDMSG:
            return {
                ...state,
                msgState: action.payload
            }
            break;

        case GETMSG:
            return {
                ...state,
                msgState: action.payload
            }
            break;

        default:
            return {
                ...state
            }
            break;
    }
}