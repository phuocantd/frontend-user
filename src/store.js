import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import createEncryptor from 'redux-persist-transform-encrypt';

import reducers from './reducers';

const encryptor = createEncryptor({
  secretKey: process.env.ENCRYPT_KEY || 'Aa123456'
});

const rootReducer = combineReducers({
  user: reducers.userReducer,
  tutor: reducers.tutorReducer
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [encryptor],
  whitelist: ['user']
};
const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);
