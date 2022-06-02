import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { userSlice } from './slices/UserSlice';
import { alertSlice } from './slices/AlertSlice';
import { spinnerSlice } from './slices/SpinnerSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    alert: alertSlice.reducer,
    spinner: spinnerSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
