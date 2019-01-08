import axios from 'axios';

import store from '../store';
import {deleteItemSuccess, getItemSuccess, updateItemSuccess} from "../actions/item-action";

export const uI = (item) => {
    return axios.put(
        //'http://localhost:8080/items',
        'https://rocky-ocean-61771.herokuapp.com/items',
        {item})
    .then(response => {
        console.log(response)
        store.dispatch(updateItemSuccess(item))
        return response;
    })
    .catch(error => {
        console.log(error)
        return error
    })

}


export const updateItems = (item) => {
    console.log(`updateItems`,item)
    return axios.put(
        'http://localhost:8080/items',
        {item})


}
export function upItems(item){
    return  function ( dispatch) {
        return updateItems(item).then(responseIem=>{
         dispatch(updateItemSuccess(responseIem));
         return responseIem
        }).catch(error => {
            console.log(error)
            throw(error);
        })
    }
}

export const getItems = () => {
    return axios.get(
        'http://localhost:8080/items'
    ).then(response => {
        store.dispatch(getItemSuccess(response.data));
        return response;
    });
}

export function deleteItem(idbooks) {
    console.log(idbooks)
    return axios.delete(
        `http://localhost:8080/items`
        , {data: {idbooks: idbooks}}
    )
        .then(response => {
            store.dispatch(deleteItemSuccess(idbooks));
            return response;
        });
}

export const createItem = (item) => {
    return axios.post(
        'http://localhost:8080/items/s'
        , {item}
    )
        .catch(error => {
            console.log(error)
            return error
        })

}