const initialState = {

    items: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ITEM_SUCCESS':
            return {
                ...state,
                items: action.payload,

            };
        case 'DELETE_ITEM_SUCCESS':
            const newState = Object.assign([], state)
            const indexOfItemToDelete = state.items.findIndex(({idbooks}) => idbooks == action.payload)
            newState.splice(indexOfItemToDelete, 1)
            window.location.href = '/'

            return newState;
        case'UPDATE_ITEM_SUCCES':
        /*    //const indexOfItemToUpdate = state.items.findIndex(({idbooks}) => idbooks == action.payload.config.data.item.idbooks)
            console.log(action)
            console.log(action.payload.config)
            console.log(action.payload.config.data.item.idbooks)*/
            return state;
        default:
            return state;
    }
};
