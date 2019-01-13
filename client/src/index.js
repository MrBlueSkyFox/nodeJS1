import './main.css'

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import App from "./router";
import store from './store';
import setAuthToken from "./setAuthToken";
import {logoutUser, setCurrentUser} from "./api/auth";
import jwt_decode from 'jwt-decode';

/*Билблиотеки локализации с помощью шаблонов*/
import {I18nextProvider,withNamespaces } from "react-i18next";
import i18next from "i18next"
import com_ru from "./translations/ru"
import com_en from "./translations/en"
import 'bootstrap/dist/css/bootstrap.min.css';

/*i18next.init({
    debug: true,
    interpolation: {escapeValue: false},  // React already does escaping
    lng: 'ru',
    resources: {
        en: {
            common: com_en
        },
        ru: {
            common: com_ru
        },
    },
});*/
//<I18nextProvider i18n={i18next}>
if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}


ReactDOM.render(
    <Provider store={store}>

            {App}

    </Provider>
    ,
    document.getElementById('root')
);

//store.subscribe(render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
