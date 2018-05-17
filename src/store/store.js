import {createStore} from 'redux'

let initState = {
    query: ''
}

export default createStore(function(state = initState, action)
{
    if (action.type === 'QUERY.UPDATE') {
        return Object.assign({}, {query: action.query});
    }

    return state;
});