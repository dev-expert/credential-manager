import { combineReducers } from 'redux';
import { users } from './user.reducer';

const appReducer = combineReducers({
    users
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
}
export default rootReducer;
