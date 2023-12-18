import { combineReducers } from 'redux';
import appReducer from '../reducers/appreducers/Index';
const rootReducer = combineReducers({
  appReducer,

});

export default rootReducer;
