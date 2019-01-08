import { combineReducers } from 'redux';

import books from './itemReducer';
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
    products:books,
    errors:errorReducer,
    auth:authReducer
});