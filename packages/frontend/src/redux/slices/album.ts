import { RootState, GenericState } from ".";
import { StateStatus } from "./state-status";
import { IAlbum } from "@dotsub-demo/common/common";
import {
    addAlbum,
    fetchAlbum,
    fetchAlbums,
    deleteAlbum,
    shareAlbum,
    unshareAlbum,
    addPhotosToAlbum,
} from "../actions/album";
import { deletePhoto } from "../actions/photo";
import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";

export const AlbumAdapter = createEntityAdapter<IAlbum>({
    selectId: (model) => model.id,
});

export const AlbumInitalState = AlbumAdapter.getInitialState<GenericState>({
    status: StateStatus.INITIALIZED,
});

export const AlbumSlice = createSlice({
    name: "Album",
    initialState: AlbumInitalState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.addOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
                AlbumAdapter.addMany(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(fetchAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.addOne(state, payload);
                state.selectedEntity = payload.id;
                state.status = StateStatus.FINISHED;
            })
            .addCase(deleteAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.removeOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(deletePhoto.fulfilled, (state, { payload }) => {
                const { albums } = payload;
                AlbumAdapter.upsertMany(state, albums);
                state.status = StateStatus.FINISHED;
            })
            .addCase(addPhotosToAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.upsertOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(shareAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.upsertOne(state, payload.album);
                state.status = StateStatus.FINISHED;
            })
            .addCase(unshareAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.upsertOne(state, payload.album);
                state.status = StateStatus.FINISHED;
            })
            .addMatcher(
                isAnyOf(
                    fetchAlbum.pending,
                    fetchAlbums.pending,
                    fetchAlbum.pending,
                    deleteAlbum.pending,
                    addPhotosToAlbum.pending,
                    shareAlbum.pending,
                    unshareAlbum.pending
                ),
                (state) => {
                    state.status = StateStatus.LOADING;
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchAlbum.rejected,
                    fetchAlbums.rejected,
                    fetchAlbum.rejected,
                    deleteAlbum.rejected,
                    addPhotosToAlbum.pending,
                    shareAlbum.pending,
                    unshareAlbum.pending
                ),
                (state) => {
                    state.status = StateStatus.ERROR;
                }
            );
    },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
    AlbumAdapter.getSelectors<RootState>((state) => state.Album);

export default AlbumSlice.reducer;
