import { combineReducers, configureStore } from '@reduxjs/toolkit';
import useReducer from './user/userSlice'; //user slice default
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

const  rootReducer = combineReducers({user: useReducer})

const persistConfig = {
  key: 'root', //user
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store);