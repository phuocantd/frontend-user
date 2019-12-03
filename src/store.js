import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
