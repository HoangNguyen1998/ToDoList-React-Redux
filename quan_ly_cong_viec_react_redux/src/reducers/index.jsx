import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEdit from './taskEdit';
import filterTable from './filterTable';
import searchTask from './searchTask';
import sortTask from './sortTask';
const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    taskEdit,
    filterTable,
    searchTask,
    sortTask
})

export default myReducer;