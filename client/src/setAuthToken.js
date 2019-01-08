import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        const superToken=`Barear ${token}`
        axios.defaults.headers.common['Authorization'] =  superToken;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;