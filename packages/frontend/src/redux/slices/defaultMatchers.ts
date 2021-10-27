import { GenericState } from ".";
import { StateStatus } from "./state-status";
import {
    isRejected,
    isRejectedWithValue,
    isPending,
    ActionReducerMapBuilder,
    EntityState,
} from "@reduxjs/toolkit";

export default <T>(builder: ActionReducerMapBuilder<EntityState<T> & GenericState>): void => {
    builder.addMatcher(isRejected, (state) => {
        state.status = StateStatus.ERROR;
        state.error = "An error has ocurred.";
    });
    builder.addMatcher(isRejectedWithValue, (state, action) => {
        state.status = StateStatus.ERROR
        state.error = action.error.message;
    });
    builder.addMatcher(isPending, (state) => {
        state.status = StateStatus.LOADING
    });
};
