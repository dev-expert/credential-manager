import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

export const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);