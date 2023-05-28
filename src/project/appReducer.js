const appReducer = (state = {wholeCollection: []}, action) =>
{
    switch(action.type)
    {
        case "LOADCOLLECTION":
            return {...state, wholeCollection: action.payload};
        
        case "UPDATECOLLECTION":
            return {...state, wholeCollection: action.payload};
        case "INCREASEQTY":
            let arrIncrease = [...state.wholeCollection];
            let indexToIncrease = arrIncrease.findIndex(x => x.id == action.payload.id);
            if(indexToIncrease >= 0)
            {
                arrIncrease[indexToIncrease].qty ++;
            } 
            return {...state, wholeCollection: arrIncrease};
        case "DECREASEQTY":
            let arrDecrease = [...state.wholeCollection];
            let indexToDecrease = arrDecrease.findIndex(x => x.id == action.payload.id);
            if(indexToDecrease >= 0)
            {
                if(arrDecrease[indexToDecrease].qty > 0){
                    arrDecrease[indexToDecrease].qty --;
                    return {...state, wholeCollection: arrDecrease};
                }
                else{
                    return {...state, wholeCollection: arrDecrease};
                }
                
            } 
            
        default:
            return state;
    }
}

export default appReducer 