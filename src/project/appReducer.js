const appReducer = (state = {wholeCollection: []}, action) =>
{
    switch(action.type)
    {
        case "LOADCOLLECTION":
            return {...state, wholeCollection: action.payload}
        default:
            return state;
    }
}

export default appReducer 