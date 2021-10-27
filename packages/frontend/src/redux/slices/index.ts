import AlbumSlice from "./album";
import PhotoSlice from "./photo";
import { combineReducers } from "redux";
import { StateStatus } from "./state-status";
export interface GenericState {
    error?: string;
    status: StateStatus;
    selectedEntity?: string
}

const RootReducer = combineReducers({
    Album: AlbumSlice,
    Photo: PhotoSlice,
});

export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
