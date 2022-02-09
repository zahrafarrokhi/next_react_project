import {
  configureStore,
  combineReducers,
  createStore,
  applyMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { compose } from 'redux';
import { persistStore } from 'redux-persist';
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper';
import { authSlice } from './slices/auth';



const makeStore = (initialState) => {
  let store;

  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const authPersistConfig = {
      key: 'authReducer',
      storage,
      blacklist: ['accessToken'],
    };

    const combinedReducers = combineReducers({
      // blacklist accessToken from auth reducer persist config, so it is not saved in local storage
      authReducer: persistReducer(authPersistConfig, authSlice.reducer),
     

    });

    const rootReducer = (state, action) => {
      if (action.type === HYDRATE) {
        const nextState = {
          ...state,
          ...action.payload,
        };
        return nextState;
      }
      return combinedReducers(state, action);
    };
    const persistConfig = {
      key: 'root',
      storage,
      // Exclude auth reducer from persist config so it has it's seperate config
      exclude: ['authReducer'],
    };

    const persistedReducers = persistReducer(persistConfig, rootReducer);

    store = createStore(
      persistedReducers,
      initialState,
      composeEnhancers(applyMiddleware(thunk)),
    );
    // store = configureStore({ reducer: persistedReducers });

    store.__PERSISTOR = persistStore(store);
  } else {
    const combinedReducers = combineReducers({
      authReducer: authSlice.reducer,
      

    });

    const rootReducer = (state, action) => {
      if (action.type === HYDRATE) {
        const nextState = {
          ...state,
          ...action.payload,
        };
        return nextState;
      }
      return combinedReducers(state, action);
    };
    store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    // store = ConfigureStore({ reducer: rootReducer });
  }
  return store;
};
export const wrapper = createWrapper(makeStore, { storeKey: 'key' });