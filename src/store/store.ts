import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth";

const store = configureStore({
  reducer: {
    auth,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ serializableCheck: false }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
