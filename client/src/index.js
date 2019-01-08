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

import 'bootstrap/dist/css/bootstrap.min.css';

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
    </Provider>,
    document.getElementById('root')
);

//store.subscribe(render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
