import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import reducers from './reducers';

const rootReducer = combineReducers({
  user: reducers.userReducer
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};
const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);
