import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const colorsReducer = (state = [], action)=> {
  if(action.type === 'SET_COLORS'){
    return action.colors;
  }
  return state;
};

const reducer = combineReducers({
  colors: colorsReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export const fetchColors = ()=> {
  return async(dispatch)=> {
    const colors = (await axios.get('/api/colors')).data;
    dispatch({ type: 'SET_COLORS', colors});
  };
};

export default store;


