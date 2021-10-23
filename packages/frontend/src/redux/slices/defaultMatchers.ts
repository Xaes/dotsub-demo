import { GenericState } from ".";
import {
    isRejected,
    isRejectedWithValue,
    isPending,
    ActionReducerMapBuilder,
    EntityState,
} from "@reduxjs/toolkit";

export default <T>(builder: ActionReducerMapBuilder<EntityState<T> & GenericState<T>>) => {
    builder.addMatcher(isRejected, (state) => {
        state.status = "finished";
        state.error = "An error has ocurred.";
    });
    builder.addMatcher(isRejectedWithValue, (state, action) => {
        state.status = "finished";
        state.error = action.error.message;
    });
    builder.addMatcher(isPending, (state) => {
        state.status = "loading";
    });
};
