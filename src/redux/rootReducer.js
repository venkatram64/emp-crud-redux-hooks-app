import {combineReducers} from 'redux';
import employeeReducer from './reducers/employeeReducer';

const rootReducer =  combineReducers({
    employee: employeeReducer
});

export default rootReducer;