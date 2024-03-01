import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { User } from "firebase/auth";
import store, { RootState } from "../store";
import { useSelector } from "react-redux";

type AuthStatus = "authenticated" | "unauthenticated" | "loading";

type AuthState = {
  user: User | null;
  status: AuthStatus;
};

const initialState: AuthState = {
  user: null,
  status: "loading",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      const user = action.payload;

      state.user = user;
      state.status = user ? "authenticated" : "unauthenticated";
    },
  },
});

export default auth.reducer;
export const useAuth = () => useSelector((state: RootState) => state.auth);
export const setUser = (value: User | null) =>
  store.dispatch(auth.actions.setUser(value));
