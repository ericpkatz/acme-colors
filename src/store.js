import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const colorsReducer = (state = [], action)=> {
  if(action.type === 'SET_COLORS'){
    return action.colors;
  }
  if(action.type === 'CREATE_COLOR'){
    return [...state, action.color ]; 
  }
  if(action.type === 'UPDATE_COLOR'){
    return state.map( color => color.id === action.color.id ? action.color : color);
  }
  if(action.type === 'DESTROY_COLOR'){
    return state.filter( color => color.id !== action.color.id); 
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

export const createColor = (color)=> {
  return async(dispatch)=> {
    color = (await axios.post('/api/colors', color)).data;
    dispatch({ type: 'CREATE_COLOR', color });

  };
};

export const updateColor = (color, history)=> {
  return async(dispatch)=> {
    color = (await axios.put(`/api/colors/${color.id}`, color)).data;
    dispatch({ type: 'UPDATE_COLOR', color });
    history.push('/colors');
  };
};

export const destroyColor = (color, history)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/colors/${color.id}`);
    dispatch({ type: 'DESTROY_COLOR', color });
    history.push('/colors');
  };
};

export default store;


