import * as types from '../constants/ActionTypes'
import _ from 'lodash';

var randomstring = require('randomstring');
var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = (data ? data : []);
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if (task.id === "") {
                task.id=randomstring.generate(10);
                state.push(task);
            }
            else if(task.id!==""){
                var index=_.findIndex(state, (state)=>{
                    return state.id===task.id
                });
                state[index]=task;
            }
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];  // Cú pháp Es6, nó copy ra một array mới và trả về
        //giống hàm map 
        case types.UPDATE_STATUS:
            var index = _.findIndex(state, (state) => {
                return state.id === action.id;
            });
            // Cách 1
            // var cloneTask={...state[index]};
            // console.log(cloneTask);
            // cloneTask.status = !cloneTask.status;
            // state.splice(index,1);
            // state.push(cloneTask);

            // Cách 2
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state]
        case types.DELETE_TASK:
            index = _.findIndex(state, (state) => {
                return state.id === action.id
            })
            state.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        default: return state;
    }
};

export default myReducer;