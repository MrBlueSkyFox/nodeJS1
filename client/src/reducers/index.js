import { combineReducers } from 'redux';

import books from './itemReducer';
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';

export default combineReducers({
    products:books,
    errors:errorReducer,
    auth:authReducer,
    i18n: i18nReducer
});