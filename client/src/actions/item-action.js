import * as types from './action-type';

/*
export function getItemSuccess(books) {
    return{
        type: types.GET_ITEM_SUCCESS,
        payload: books
    }
}
*/
export const addItemSuccess= item=>{
    return{
        type:types
    }
}

export const updateItemSuccess= item=>{
    return{
        type:types.UPDATE_ITEM_SUCCES,
        payload:item
    }
}
export const deleteItemSuccess = idbooks => {
    return {
        type: types.DELETE_ITEM_SUCCESS,
        payload: idbooks
    }

}

export const getItemSuccess = products => {
    return {
        type: types.GET_ITEM_SUCCESS,
        payload: products
    }
}
