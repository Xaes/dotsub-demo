import AlbumSlice from "./album";
import PhotoSlice from "./photo";
import { combineReducers } from "redux";
export interface GenericState {
    error?: string;
    status: "loading" | "finished" | "error" | "initialized";
}

const RootReducer = combineReducers({
    Album: AlbumSlice,
    Photo: PhotoSlice,
});

export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
