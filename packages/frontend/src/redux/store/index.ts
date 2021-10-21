import RootReducer, { RootState } from "../slices";
import ThunkMiddleware, { ThunkAction } from "redux-thunk";
import { configureStore, applyMiddleware, Action } from "@reduxjs/toolkit";

const thunkEnhancer = applyMiddleware(ThunkMiddleware);

const Store = configureStore({
    reducer: RootReducer,
    enhancers: [thunkEnhancer],
});

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default Store;
