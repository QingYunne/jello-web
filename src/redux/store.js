import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import activeBoardReducer from './activeBoard/activeBoardSlice'
import activeCardReducer from './activeCard/activeCardSlice'
import userReducer from './user/userSlice'
import storage from 'redux-persist/lib/storage'

const REDUCERS = {
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer
}

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user']
  // blackllist: ['']
}

const reducers = combineReducers(REDUCERS)

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})
