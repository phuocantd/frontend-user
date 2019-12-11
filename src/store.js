import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const rootReducer = combineReducers({
  user: reducers.userReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
