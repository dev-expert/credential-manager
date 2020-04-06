import { userConstant } from '../constants/user.constant';
export function users(state = {}, action) {
    debugger
    switch (action.type) {
        case userConstant.GET_USER_REQUEST:
            return {
                loading: true
            };
        case userConstant.GET_USER_SUCCESS:
            return {
                users: action.users
            };
        case userConstant.GET_USER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
};