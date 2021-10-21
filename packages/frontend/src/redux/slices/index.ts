import AlbumSlice from "./album";
import { combineReducers } from "redux";

export interface GenericState {
    error?: string;
    status: "loading" | "finished" | "error" | "initialized";
}

const RootReducer = combineReducers({
    Album: AlbumSlice,
});

export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
