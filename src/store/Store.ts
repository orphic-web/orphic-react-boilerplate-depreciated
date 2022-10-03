import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/UserSlice';
import { alertSlice } from './slices/AlertSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    alert: alertSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
