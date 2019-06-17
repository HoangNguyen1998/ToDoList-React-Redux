import * as types from '../constants/ActionTypes';

var initialState={
    by:"",
    value: 0
}
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT_TASK:
            console.log(action.sort);
            return action.sort;
        default: return state;
    }
};

export default myReducer;