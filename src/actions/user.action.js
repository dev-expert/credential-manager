import { userService } from '../services/user.service';
import { userConstant } from '../constants/user.constant';

export const userAction = {
    getUsers,
}

function getUsers() {
    return dispatch => {
        request();
        userService.getUsers()
            .then(
                users => {
                    dispatch(success(users))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstant.GET_USER_REQUEST } }
    function success(users) { return { type: userConstant.GET_USER_SUCCESS, users } }
    function failure(error) { return { type: userConstant.GET_USER_FAILURE, error } }
}