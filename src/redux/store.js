import CartReducer from "./slice/CartSlice"
import UserReducer from "./slice/UserSlice"
import ProductReducer from "./slice/ProductSlice"
import { combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

//Making it persistent to avoid loss of data on refresh... 
const persistConfig = {
    key: 'root',
    storage,
  }
  
  const rootReducer = combineReducers({
      UserReducer,
      CartReducer,
      ProductReducer
    })
  
    const persistedReducer = persistReducer(persistConfig,rootReducer)
  
  export const store=configureStore({
      reducer:persistedReducer
  })
  
  export const persistor = persistStore(store);