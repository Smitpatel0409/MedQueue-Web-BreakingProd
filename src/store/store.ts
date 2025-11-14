'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { serverApi } from './serverApi';
import { graphqlApi } from './graphqlApi';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  [serverApi.reducerPath]: serverApi.reducer,
  [graphqlApi.reducerPath]: graphqlApi.reducer,
});

export const rtkStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware, graphqlApi.middleware),
});

setupListeners(rtkStore.dispatch);

export type RootState = ReturnType<typeof rtkStore.getState>;
export type AppDispatch = typeof rtkStore.dispatch;
