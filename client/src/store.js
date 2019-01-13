import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {loadTranslations, setLocale, syncTranslationWithStore} from "react-redux-i18n";

const translationsObject = {
    en: {
        welcome: {
            title: 'Welcome to the online boookstore',
            hello: 'Hello, %{name}!',
            mock:""
        },
        buttons: {
            buy: "Buy book ",
            delete: "Delete book",
            edit: "Edit"
        },
        controlElem: {
            signIn: "SignIn",
            signOut: "SignOut",
            signUp:"Registry"
        },
    },
    ru: {
        welcome: {
            title: 'Добро пожаловать в книжный магазин',
            hello: 'Привет, %{name}!',
            mock:""
        },
        buttons: {
            buy: "Купить книгу ",
            delete: "Удалить книгу",
            edit: "Изменить"
        },
        controlElem: {
            signIn: "Вход",
            signOut: "Выйти",
            signUp:"Регистрация"
        },
    }
};

const store = createStore(rootReducer, applyMiddleware(thunk));

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('en'));

export default store;